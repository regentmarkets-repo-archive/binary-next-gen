export function accountSelector(state) { return state.account; }
export function bootSelector(state) { return state.boot; }
export function assetIndexSelector(state) { return state.assetIndex; }
export function assetsSelector(state) { return state.assets; }
export function createAccountSelector(state) { return state.createAccount; }
export function chartDataSelector(state) { return state.chartData; }
export function digitStatsSelector(state) { return state.digitStats; }
export function paymentAgentSelector(state) { return state.paymentAgent; }
export function settingsSelector(state) { return state.settings; }
export function ticksSelector(state) { return state.ticks; }
export function tradingTimesSelector(state) { return state.tradingTimes; }
export function transactionsSelector(state) { return state.transactions; }
export function watchlistSelector(state) { return state.watchlist; }
export function workspaceSelector(state) { return state.workspace; }
export function viewsSelector(state) { return state.views; }
export function dailyPricesSelector(state) { return state.dailyPrices; }
export function boughtContractsSelector(state) { return state.boughtContracts; }
export function portfolioSelector(state) { return state.portfolio; }
export function feedLicensesSelector(state) { return state.feedLicenses; }
export function ohlcSelector(state) { return state.ohlc; }
export function tradingOptionsSelector(state) { return state.tradingOptions; }
export function statesSelector(state) { return state.states; }

export function tradeParamsSelector(state) { return state.tradesParams; }
export function tradeProposalSelector(state) { return state.tradesProposalInfo; }
export function tradePurchaseInfoSelector(state) { return state.tradesPurchaseInfo; }
export function tradesUIStatesSelector(state) { return state.tradesUIStates; }
export function tradesErrorSelector(state) { return state.tradesError; }

export function themeSelector(state) { return state.boot.get('theme'); }

export function loginidSelector(state) { return state.account.get('loginid'); }

export function balanceSelector(state) { return state.account.get('balance'); }

export function serverTimeDiffSelector(state) { return state.server.get('timeDiff'); }

export function currencySelector(state) { return state.account.get('currency'); }

export function transactionsFilterSelector(state) { return state.views.get('transactionsFilter'); }

export function assetIndexSubmarketSelector(state) { return state.views.getIn(['assetIndex', 'submarketId']); }

export function assetIndexFilterSelector(state) { return state.views.getIn(['assetIndex', 'filter']); }

export function tradingTimesFilterSelector(state) { return state.views.get('tradingTimes'); }

export function selectedAssetSelector(state) { return state.workspace.get('selectedAsset'); }

export function activeTradeIndexSelector(state) { return state.workspace.get('activeTradeIndex'); }

export const tradesCountSelector =
    state => state.workspace.get('tradesCount');

export const layoutNSelector =
    state => state.workspace.get('layoutN');
