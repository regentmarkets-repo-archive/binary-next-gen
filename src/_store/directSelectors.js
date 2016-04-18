export const accountSelector = state => state.account;
export const bootSelector = state => state.boot;
export const assetIndexSelector = state => state.assetIndex;
export const assetsSelector = state => state.assets;
export const createAccountSelector = state => state.createAccount;
export const paymentAgentSelector = state => state.paymentAgent;
export const settingsSelector = state => state.settings;
export const ticksSelector = state => state.ticks;
export const tradingTimesSelector = state => state.tradingTimes;
export const transactionsSelector = state => state.transactions;
export const watchlistSelector = state => state.watchlist;
export const workspaceSelector = state => state.workspace;
export const viewsSelector = state => state.views;
export const dailyPricesSelector = state => state.dailyPrices;
export const boughtContractsSelector = state => state.boughtContracts;
export const portfolioSelector = state => state.portfolio;
export const feedLicensesSelector = state => state.feedLicenses;

export const loginidSelector = state => state.account.get('loginid');
export const balanceSelector = state => state.account.get('balance');

export const serverTimeDiffSelector = state => state.server.get('timeDiff');
export const currencySelector = state =>
    state.account.get('currency');

export const transactionsFilterSelector = state =>
    state.views.get('transactionsFilter');

export const assetIndexSubmarketSelector = state =>
    state.views.getIn(['assetIndex', 'submarketId']);

export const assetIndexFilterSelector = state =>
    state.views.getIn(['assetIndex', 'filter']);

export const tradingTimesFilterSelector = state =>
    state.views.get('tradingTimes');

export const selectedAssetSelector = state =>
    state.workspace.get('selectedAsset');

export const activeTradeIndexSelector = state =>
    state.workspace.get('activeTradeIndex');

export const tradesCountSelector =
    state => state.workspace.get('tradesCount');

export const layoutNSelector =
    state => state.workspace.get('layoutN');
