import { LiveApi } from 'binary-live-api';
import { showError, timeLeftToNextRealityCheck } from 'binary-utils';
import { readNewsFeed } from './NewsData';
import { getVideosFromPlayList } from './VideoData';
import * as actions from '../_actions';
import { SET_DEFAULT_CURRENCY } from '../_constants/ActionTypes';

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
    news: 'updateNewsList',
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
    videos: 'updateVideoList',
    residence_list: 'serverCountryList',
};

const bootConfig = typeof window !== 'undefined' ? window.BinaryBoot : {};
export const api = new LiveApi(bootConfig);

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

    api.getLandingCompanyDetails(authData.authorize.landing_company_name)
        .then(r => {
            const details = r.landing_company_details;

            store.dispatch({
                type: SET_DEFAULT_CURRENCY,
                currency: details.legal_default_currency,
            });

            const acknowledged = state.realityCheck.get('acknowledged');
            if (details && details.has_reality_check) {
                if (!acknowledged) {
                    store
                        .dispatch(actions.updateRealityCheckSummary())
                        .then(() => store.dispatch(actions.initRealityCheck()));
                } else {
                    const interval = state.realityCheck.get('interval');
                    const loginTime = state.realityCheck.getIn(['summary', 'loginTime']);
                    const timeToWait = timeLeftToNextRealityCheck(loginTime, interval) * 1000;
                    store
                        .dispatch(actions.updateRealityCheckSummary())
                        .then(() => setTimeout(() =>
                            store.dispatch(actions.showRealityCheckPopUp()),
                            timeToWait
                        ));
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
        const firstOpenActiveSymbol = r.active_symbols.find(a => a.exchange_is_open === 1);
        const symbolToUse = firstOpenActiveSymbol ? firstOpenActiveSymbol.symbol : r.active_symbols[0].symbol;
        const tradesCount = state.tradesParams.size;
        if (tradesCount === 0) {
            store.dispatch(actions.changeActiveLayout(1, 1));
        }
        store.dispatch(actions.changeExaminedAsset(symbolToUse));

        subscribeToWatchlist(r.active_symbols);
    });

    api.getTradingTimes(new Date());
    api.getAssetIndex();
    api.getServerTime();

    api.getPortfolio();
    api.getStatement({ description: 1, limit: 20 });
    api.getAccountSettings().then(msg => {
        if (msg.get_settings.country_code) {
            api.getPaymentAgentsForCountry(msg.get_settings.country_code);
        }
    });
    api.getPayoutCurrencies();
    api.subscribeToBalance();           // some call might fail due to backend overload
    api.subscribeToAllOpenContracts();
    api.subscribeToTransactions();
    // subscribeToSelectedSymbol(store);

    if (authData.authorize.is_virtual !== 1) {
        api.getAccountLimits();
        api.getSelfExclusion();
        api.getCashierLockStatus();
    }

    const articles = await readNewsFeed('en');
    api.events.emit('news', articles);
    const videos = await getVideosFromPlayList();
    api.events.emit('videos', videos);
};

export const trackSymbols = symbols => {
    api.unsubscribeFromAllTicks();
    api.subscribeToTicks(symbols);
};

export const connect = async store => {
    Object.keys(handlers).forEach(key => {
        const action = actions[handlers[key]];

        api.events.on(key, data => store.dispatch(action(data)));
        api.events.on(key, () => window.console.warn);
    });
    api.getResidences();
    api.events.on('authorize', response => response.error ? null : initAuthorized(response, store));
};
