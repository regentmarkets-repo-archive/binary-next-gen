export const accountSelector = state => state.account;
export const appConfigSelector = state => state.appConfig;
export const assetIndexSelector = state => state.assetIndex;
export const assetsSelector = state => state.assets;
export const contractsSelector = state => state.contracts;
export const createAccountSelector = state => state.createAccount;
export const paymentAgentSelector = state => state.paymentAgent;
export const settingsSelector = state => state.settings;
export const ticksSelector = state => state.ticks;
export const tradingTimesSelector = state => state.tradingTimes;
export const transactionsSelector = state => state.transactions;
export const watchlistSelector = state => state.watchlist;
export const workspaceSelector = state => state.workspace;
export const viewsSelector = state => state.views;

export const currencySelector = state =>
    state.account.get('currency');

export const transactionsFilterSelector = state =>
    state.views.get('transactionsFilter');

export const assetIndexSubmarketSelector = state =>
    state.views.getIn(['assetIndex', 'submarketId']);

export const tradingTimesFilterSelector = state =>
    state.views.get('tradingTimes');
