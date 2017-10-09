import { LiveApi } from 'binary-live-api';
import { showError, timeLeftToNextRealityCheck, nowAsEpoch } from 'binary-utils';
import * as actions from '../_actions';
import { CHANGE_INFO_FOR_ASSET, UPDATE_SETTINGS_FIELD, SERVER_DATA_STATES } from '../_constants/ActionTypes';

const handlers = {
    active_symbols: 'serverDataActiveSymbols',
    asset_index: 'serverDataAssetIndex',
    authorize: 'serverDataAuthorize',
    balance: 'serverDataBalance',
    candles: 'serverDataCandles',
    cashier_password: 'serverDataCashierLock',
    change_password: 'serverDataChangePassword',
    get_limits: 'serverDataAccountLimits',
    get_self_exclusion: 'serverDataAccountSelfExclusion',
    get_settings: 'serverDataAccountSettings',
    history: 'serverDataTickHistory',
    ohlc: 'serverDataOHLCStream',
    paymentagent_list: 'serverDataPaymentAgents',
    proposal_open_contract: 'serverDataProposalOpenContract',
    payout_currencies: 'serverDataPayoutCurrencies',
    proposal: 'serverDataProposal',
    portfolio: 'serverDataPortfolio',
    statement: 'serverDataStatement',
    time: 'serverDataTime',
    tick: 'serverDataTickStream',
    trading_times: 'serverDataTradingTimes',
    transaction: 'serverTransactionStream',
    residence_list: 'serverCountryList',
    website_status: 'serverDataWebsiteStatus',
};

// window does not exist when running test
const bootConfig = typeof window !== 'undefined' ? window.BinaryBoot : {};
const ApiConstructor = typeof WebSocket !== 'undefined' ? LiveApi : () => null;
export const api = new ApiConstructor(bootConfig);

const configForChart = Object.assign({ keepAlive: true }, bootConfig);
delete configForChart.connection;

const memoizedWebsocketConn = [
    new ApiConstructor(configForChart),        // for contract chart
    new ApiConstructor(configForChart),        // for first trade
];

export const chartApi = (n) => {
    while (!memoizedWebsocketConn[n]) {
        memoizedWebsocketConn.push(new ApiConstructor(configForChart));
    }
    return memoizedWebsocketConn[n];
};

export const changeLanguage = langCode => {
    api.changeLanguage(langCode);
    api.getActiveSymbolsFull();
    api.getAssetIndex();
    api.getTradingTimes(new Date());
};

export const getTickHistory = async (symbol) => {
    try {
        await api.getTickHistory(symbol, { end: 'latest', count: 10, subscribe: 1, adjust_start_time: 1 });
    } catch (err) {
        await api.getTickHistory(symbol, { end: 'latest', count: 10 });
    }
};
const initAuthorized = async (authData, store) => {
    if (/japan/.test(authData.authorize.landing_company_name)) {
        showError('Sorry, for japan user please login through www.binary.com ');
        store.dispatch(actions.updateAppState('authorized', false));
        store.dispatch(actions.updateToken(''));
        return;
    }

    const state = store.getState();

    api.unsubscribeFromAllTicks();
    api.unsubscribeFromAllProposals();
    api.unsubscribeFromAllPortfolios();
    api.unsubscribeFromAllOpenContracts();

    api.getLandingCompanyDetails(authData.authorize.landing_company_name)
        .then(r => {
            const details = r.landing_company_details;

            const acknowledged = state.realityCheck.get('acknowledged');
          if (details && details.has_reality_check) {
                if (!acknowledged) {
                    store
                        .dispatch(actions.updateRealityCheckSummary())
                        .then(() => store.dispatch(actions.initRealityCheck()));
                } else if (acknowledged) {
                  const refreshedRealityCheck = state.appState.get('refreshedRealityCheck');
                  const realityCheckStartTime = state.realityCheck.get('realityCheckStartTime');
                  const interval = state.realityCheck.get('interval');
                  const loginTime = state.realityCheck.getIn(['summary', 'loginTime']);
                  const timeToWait = timeLeftToNextRealityCheck(loginTime, interval) * 1000;

                  if (!refreshedRealityCheck && realityCheckStartTime * 1000 + timeToWait > nowAsEpoch() * 1000) {
                    store.dispatch(actions.updateAppState('refreshedRealityCheck', true));
                    const timeToWaitAfterRefresh = (realityCheckStartTime * 1000 + timeToWait) - nowAsEpoch() * 1000;
                    store
                      .dispatch(actions.updateRealityCheckSummary())
                      .then(() => setTimeout(() =>
                          store.dispatch(actions.showRealityCheckPopUp()),
                        timeToWaitAfterRefresh
                      ));
                  }
                }
            } else {
                store.dispatch(actions.disableRealityCheck());
            }
        });

    const subscribeToWatchlist = assets => {
        if (!state.watchlist) {
            return;
        }
        const existingWatchlist = state.watchlist.filter(w => assets.find(x => x.symbol === w));
        existingWatchlist.forEach(getTickHistory);
    };

    api.getActiveSymbolsFull().then(r => {
        const cachedParams = state.tradesParams.toJS();
        const tradableSymbols = r.active_symbols.filter(a => {
            const isOpen = a.exchange_is_open === 1;
            const allowStartLater = a.allow_forward_starting === 1;
            const suspended = a.is_trading_suspended === 1;
            return (!suspended && (isOpen || allowStartLater));
        });

        const firstOpenActiveSymbol = tradableSymbols.find(a => a.exchange_is_open === 1);
        let symbolToUse = firstOpenActiveSymbol ? firstOpenActiveSymbol.symbol : tradableSymbols[0].symbol;

        const layout = state.workspace.get('layoutN');

        if (cachedParams.length > 0) {
            const allowedSymbols = cachedParams
                .filter(c => tradableSymbols.some(a => a.symbol === c.symbol)).map(a => a.symbol);

            const needToAdd = cachedParams.length - allowedSymbols.length;

            const newSymbols = tradableSymbols.filter(a => a.exchange_is_open === 1).slice(0, needToAdd).map(a => a.symbol);

            const symbols = allowedSymbols.concat(newSymbols);

            symbolToUse = symbols[0];

            symbols.forEach((s, idx) => store.dispatch(actions.createTrade(idx, s)));
            store.dispatch(actions.updateActiveLayout(cachedParams.length, layout, symbols));
        } else {
            store.dispatch(actions.resetTrades());
            store.dispatch(actions.changeActiveLayout(1, 1));
        }

        store.dispatch(actions.getDailyPrices(symbolToUse));
        store.dispatch(actions.getTicksByCount(symbolToUse, 100, false));
        store.dispatch({ type: CHANGE_INFO_FOR_ASSET, symbol: symbolToUse });

        subscribeToWatchlist(tradableSymbols);
    });

    api.getTradingTimes(new Date());
    api.getAssetIndex();
    api.getServerTime();

    api.getPortfolio();
    api.getStatement({ description: 1, limit: 20 });
    api.getAccountSettings().then(msg => {
      store.dispatch({ type: UPDATE_SETTINGS_FIELD, settings: msg });
      if (msg.get_settings.country_code) {
            api.getPaymentAgentsForCountry(msg.get_settings.country_code);
            api.getStatesForCountry(msg.get_settings.country_code).then(message => {
              store.dispatch({ type: SERVER_DATA_STATES, states: message.states_list });
            });
            api.getLandingCompany(msg.get_settings.country_code).then(message => {
              const landingCompany = message.landing_company;
              const accounts = state.boot.get('accounts').toJS();
              const loginid = authData.authorize.loginid;
              const allUserAccounts = accounts.map((val) => val.account);
              const userHasMLT = allUserAccounts.some(value => value.startsWith('MLT'));
              const userHasMX = allUserAccounts.some(value => value.startsWith('MX'));
              const userHasCR = allUserAccounts.some(value => value.startsWith('CR'));
              const userHasMF = allUserAccounts.some(value => value.startsWith('MF'));
              const isVirtual = loginid.startsWith('VRTC');
              const isMLT = loginid.startsWith('MLT');
              /* eslint-disable */
              const shouldShowUpgrade = (() => {
                if (landingCompany.id !== 'jp') {
                  if (landingCompany.hasOwnProperty('financial_company') && landingCompany.financial_company.shortcode === 'maltainvest') {
                    if (landingCompany.hasOwnProperty('gaming_company') && landingCompany.gaming_company.shortcode === 'malta') {
                      // can upgrade to real or maltainvest
                      if (isVirtual && !userHasMLT && !userHasMX && !userHasCR) {
                        return 'toReal';
                        //	 to mlt
                      } else if (isMLT && !userHasMF) {
                        return 'toMaltainvest';
                        //	to mf
                      }
                    } else if (isVirtual && !userHasMF) {
                      //	upgrade to maltainvest
                      return 'toMaltainvest';
                    }
                  } else if (landingCompany.hasOwnProperty('financial_company') && landingCompany.financial_company.shortcode !== 'maltainvest') {
                    if (isVirtual && !userHasMLT && !userHasMX && !userHasCR) {
                      // can upgrade to real
                      return 'toReal';
                    }
                  }
                }
              })();
              store.dispatch(actions.updateAppState('shouldShowUpgrade', shouldShowUpgrade));
              /* eslint-enable */
            });
        }
    });
    api.getPayoutCurrencies();
    api.subscribeToBalance();
    api.subscribeToAllOpenContracts();
    api.subscribeToTransactions();
    // subscribeToSelectedSymbol(store);

    if (authData.authorize.is_virtual !== 1) {
        api.getAccountLimits();
        api.getSelfExclusion();
        api.getCashierLockStatus();
    }
};

export const trackSymbols = symbols => {
    api.unsubscribeFromAllTicks();
    api.subscribeToTicks(symbols);
};

export const connect = async store => {
    Object.keys(handlers).forEach(key => {
        const action = actions[handlers[key]];

        api.events.on(key, data => store.dispatch(action(data)));
        // api.events.on(key, (data) => console.warn(key, data));
    });
    api.getResidences();
    api.getWebsiteStatus();
    api.events.on('authorize', response => response.error ? null : initAuthorized(response, store));
};
