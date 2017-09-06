export const accountSelector = state => state.account;
export const bootSelector = state => state.boot;
export const assetIndexSelector = state => state.assetIndex;
export const assetsSelector = state => state.assets;
export const createAccountSelector = state => state.createAccount;
export const digitStatsSelector = state => state.digitStats;
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
export const ohlcSelector = state => state.ohlc;
export const tradingOptionsSelector = state => state.tradingOptions;
export const statesSelector = state => state.states;
export const tradeParamsSelector = state => state.tradesParams;
export const tradeProposalSelector = state => state.tradesProposalInfo;
export const tradePurchaseInfoSelector = state => state.tradesPurchaseInfo;
export const tradesUIStatesSelector = state => state.tradesUIStates;
export const tradesErrorSelector = state => state.tradesError;
export const residenceListSelector = state => state.residenceList;

export const themeSelector = state =>
    state.boot.get('theme');

export const loginidSelector = state =>
    state.account.get('loginid');

export const balanceSelector = state =>
    state.account.get('balance');

export const serverTimeDiffSelector = state =>
    state.server.get('timeDiff');

export const currencySelector = state =>
    state.account.get('currency');

export const transactionsFilterSelector = state =>
    state.views.get('transactionsFilter');

export const assetIndexSubmarketSelector = state =>
    state.views.getIn(['assetIndex', 'submarketId']);

export const assetIndexFilterSelector = state =>
    state.views.get('assetIndex');

export const tradingTimesFilterSelector = state =>
    state.views.get('tradingTimes');

export const examinedAssetSelector = state =>
    state.workspace.get('examinedAsset');

export const tradesCountSelector =
    state => state.workspace.get('tradesCount');

export const layoutNSelector =
    state => state.workspace.get('layoutN');

export const fractionalDigitsSelector = state => {
  const account = state.account;
  const currency = account.get('currency');
  const currencies_config = account.get('currencies_config');

  const config = currencies_config && currencies_config.get(currency);
  return config && config.get('fractional_digits') || 2;
};
