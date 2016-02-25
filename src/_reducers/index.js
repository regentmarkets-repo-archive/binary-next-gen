import { combineReducers } from 'redux';

import appConfig from './AppConfigReducer';
import appState from './AppStateReducer';
import account from './AccountReducer';
import assets from './AssetsReducer';
import assetIndex from './AssetIndexReducer';
import assetPicker from './AssetPickerReducer';
import portfolio from './PortfolioReducer';
import contracts from './ContractsReducer';
import openContracts from './OpenContractProposalsReducer';
import settings from './SettingsReducer';
import signin from './SigninReducer';
import tradingTimes from './TradingTimesReducer';
import transactions from './TransactionsReducer';
import ticks from './TickReducer';
import tickTrade from './TickTradeReducer';
import workspace from './WorkspaceReducer';
import watchlist from './WatchlistReducer';
import video from './VideoReducer';
import news from './NewsReducer';
import paymentAgent from './PaymentAgentReducer';
import createAccount from './CreateAccountReducer';
import upgrade from './UpgradeReducer';
import states from './StatesReducer';
import tradingOptions from './TradingOptionsReducer';
import proposals from './ProposalsReducer';
import quickTrade from './QuickTradeReducer';
import trades from './TradeReducer';
import views from './ViewsReducer';
import time from './ServerTimeReducer';

export default combineReducers({
    appState,
    appConfig,
    account,
    assets,
    assetIndex,
    assetPicker,
    createAccount,
    news,
    time,
    paymentAgent,
    portfolio,
    contracts,
    openContracts,
    proposals,
    quickTrade,
    settings,
    signin,
    states,
    tradingTimes,
    transactions,
    ticks,
    tickTrade,
    tradingOptions,
    upgrade,
    video,
    workspace,
    watchlist,
    trades,
    views,
});
