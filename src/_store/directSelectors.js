export const accountSelector = state => state.account;
export const appConfigSelector = state => state.appConfig;
export const assetsSelector = state => state.assets;
export const createAccountSelector = state => state.createAccount;
export const paymentAgentSelector = state => state.paymentAgent;
export const settingsSelector = state => state.settings;
export const ticksSelector = state => state.ticks;
export const tradingTimesSelector = state => state.tradingTimes;
export const transactionsSelector = state => state.transactions;
export const watchlistSelector = state => state.watchlist;
export const workspaceSelector = state => state.workspace;

export const currencySelector = state => state.account.get('currency');
export const transactionsFilterSelector = state => state.workspace.get('transactionsFilter');
