import { LiveApi } from 'binary-live-api';
import { readNewsFeed } from './NewsData';
import { getVideosFromPlayList } from './VideoData';
import * as actions from '../_actions';

const handlers = {
    authorize: 'serverDataAuthorize',
    balance: 'serverDataBalance',
    active_symbols: 'serverDataActiveSymbols',
    trading_times: 'serverDataTradingTimes',
    asset_index: 'serverDataAssetIndex',
    portfolio: 'serverDataPortfolio',
    statement: 'serverDataStatement',
    tick: 'serverDataTickStream',
    history: 'serverDataTickHistory',
    candles: 'serverDataCandles',
    time: 'serverDataTime',
    proposal_open_contract: 'serverDataProposalOpenContract',
    payout_currencies: 'serverDataPayoutCurrencies',
    proposal: 'serverDataProposal',
    get_limits: 'serverDataAccountLimits',
    get_self_exclusion: 'serverDataAccountSelfExclusion',
    cashier_password: 'serverDataCashierLock',
    change_password: 'serverDataChangePassword',
    get_settings: 'serverDataAccountSettings',
    news: 'updateNewsList',
    videos: 'updateVideoList',
    paymentagent_list: 'serverDataPaymentAgents',
};

export const api = new LiveApi({ language: 'EN' });

const subscribeToSelectedSymbol = store => {
    const selectedSymbol = store.getState().workspace.get('selectedAsset');
    api.getTickHistory(selectedSymbol, { end: 'latest', count: 20 });
    api.subscribeToTick(selectedSymbol);
    store.dispatch(actions.getTradingOptions(selectedSymbol));
};

const subscribeToWatchlist = store => {
    const state = store.getState();
    if (!state.watchlist) {
        return;
    }
    api.subscribeToTicks(state.watchlist.toJS());
};

export const changeLanguage = language => {
    api.changeLanguage(language);
    api.getActiveSymbolsFull();
    api.getAssetIndex();
    api.getTradingTimes(new Date());
};

const initUnauthorized = async store => {
    api.getActiveSymbolsFull();
    api.getTradingTimes(new Date());
    api.getAssetIndex();
    api.getServerTime();

    api.getCandlesForLastNDays('R_100', 30);

    const articles = await readNewsFeed('en');
    api.events.emit('news', articles);
    const videos = await getVideosFromPlayList();
    api.events.emit('videos', videos);
    subscribeToSelectedSymbol(store);
};

const initAuthorized = (authData, store) => {
    api.getPortfolio();
    api.getStatement({ description: 1, limit: 20 });
    api.getAccountSettings().then(msg =>
        api.getPaymentAgentsForCountry(msg.get_settings.country_code)
    );
    api.getPayoutCurrencies();
    api.subscribeToBalance();           // some call might fail due to backend overload
    api.subscribeToAllOpenContracts();
    subscribeToWatchlist(store);

    const isVirtual = authData.authorize.loginid.startsWith('VRTC');
    if (!isVirtual) {
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
    let language = store.getState().appConfig.get('language');
    api.changeLanguage(language);

    Object.keys(handlers).forEach(key => {
        const action = actions[handlers[key]];

        api.events.on(key, data => store.dispatch(action(data)));
        api.events.on(key, () => window.console.warn);
    });

    api.events.on('authorize', response => response.error ? null : initAuthorized(response, store));

    await initUnauthorized(store);
};
