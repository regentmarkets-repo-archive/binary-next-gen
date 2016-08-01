import { LiveApi } from 'binary-live-api';
import { showError } from 'binary-utils';
import { readNewsFeed } from './NewsData';
import { getVideosFromPlayList } from './VideoData';
import * as actions from '../_actions';
import { timeLeftToNextRealityCheck } from '../reality-check/RealityCheckWeb';
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
};

const bootConfig = typeof window !== 'undefined' ? window.BinaryBoot : {};
export const api = new LiveApi(bootConfig);

const subscribeToWatchlist = store => {
    const state = store.getState();
    if (!state.watchlist) {
        return;
    }
    api.subscribeToTicks(state.watchlist.toJS());
};

export const changeLanguage = langCode => {
    api.changeLanguage(langCode);
    api.getActiveSymbolsFull();
    api.getAssetIndex();
    api.getTradingTimes(new Date());
};

const initAuthorized = async (authData, store) => {
    if (/japan/.test(authData.authorize.landing_company_name)) {
        showError('Sorry, for japan user please login through www.binary.com ');
        store.dispatch(actions.updateAppState('authorized', false));
        store.dispatch(actions.updateToken(''));
        return;
    }
    api.getLandingCompanyDetails(authData.authorize.landing_company_name)
        .then(r => {
            const details = r.landing_company_details;

            store.dispatch({
                type: SET_DEFAULT_CURRENCY,
                currency: details.legal_default_currency,
            });

            const acknowledged = store.getState().realityCheck.get('acknowledged');
            if (details && details.has_reality_check) {
                if (!acknowledged) {
                    store
                        .dispatch(actions.updateRealityCheckSummary())
                        .then(() => store.dispatch(actions.initRealityCheck()));
                } else {
                    const interval = store.getState().realityCheck.get('interval');
                    const loginTime = store.getState().realityCheck.getIn(['summary', 'loginTime']);
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

    api.getActiveSymbolsFull();
    api.getTradingTimes(new Date());
    api.getAssetIndex();
    api.getServerTime();
    api.getCandlesForLastNDays('R_100', 30);

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
    subscribeToWatchlist(store);
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

    api.events.on('authorize', response => response.error ? null : initAuthorized(response, store));
};
