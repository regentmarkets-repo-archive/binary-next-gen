import { routerReducer } from 'react-router-redux';

import boot from './BootReducer';
import appState from './AppStateReducer';
import account from './AccountReducer';
import assets from './AssetsReducer';
import assetIndex from './AssetIndexReducer';
import assetPicker from './AssetPickerReducer';
import digitStats from './DigitStatsReducer';
import dailyPrices from './DailyPricesReducer';
import feedLicenses from './FeedLicensesReducer';
import boughtContracts from './BoughtContractsReducer';
import paymentAgent from './PaymentAgentReducer';
import portfolio from './PortfolioReducer';
import proposals from './ProposalsReducer';
import quickTrade from './QuickTradeReducer';
import realityCheck from './RealityCheckReducer';
import settings from './SettingsReducer';
import states from './StatesReducer';
import server from './ServerReducer';

import tradesParams from './trades/TradesParamsReducer';
import tradesProposalInfo from './trades/TradesProposalInfoReducer';
import tradesPurchaseInfo from './trades/TradesPurchaseInfoReducer';
import tradesUIStates from './trades/TradesUIStateReducer';
import tradesError from './trades/TradesErrorReducer';

import tradingOptions from './TradingOptionsReducer';
import tradingTimes from './TradingTimesReducer';
import transactions from './TransactionsReducer';
import ticks from './TickReducer';
import ohlc from './OHLCReducer';
import views from './ViewsReducer';
import upgrade from './UpgradeReducer';
import workspace from './WorkspaceReducer';
import watchlist from './WatchlistReducer';
// import chartData from './ChartDataReducer';
import residenceList from './CountryListReducer';
import websiteStatus from './WebsiteStatusReducer';

// same as redux combineReducers but also passes root state.
function combineReducersModified(reducers) {
    const reducerKeys = Object.keys(reducers);

    return function combination(state = {}, action) {
        let hasChanged = false;
        const nextState = { };
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];
            const reducer = reducers[key];
            if (typeof reducer === 'function') {
                const previousStateForKey = state[key];
                const nextStateForKey = reducer(previousStateForKey, action, state);
                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }
        }
        return hasChanged ? nextState : state;
    };
}

export default combineReducersModified({
    appState,
    account,
    assets,
    assetIndex,
    assetPicker,
    boot,
    boughtContracts,
    // chartData,
    dailyPrices,
    digitStats,
    feedLicenses,
    ohlc,
    paymentAgent,
    portfolio,
    proposals,
    quickTrade,
    realityCheck,
    residenceList,
    server,
    settings,
    states,
    ticks,
    tradingTimes,
    transactions,
    tradesParams,
    tradesProposalInfo,
    tradesPurchaseInfo,
    tradesUIStates,
    tradesError,
    tradingOptions,
    workspace,
    watchlist,
    views,
    upgrade,
    websiteStatus,
    routing: routerReducer,
});
