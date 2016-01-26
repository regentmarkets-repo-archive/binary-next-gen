import { combineReducers } from 'redux';

import appConfig from './AppConfigReducer';
import appState from './AppStateReducer';
import account from './AccountReducer';
import assets from './AssetsReducer';
import assetPicker from './AssetPickerReducer';
import portfolio from './PortfolioReducer';
import contracts from './ContractsReducer';
import openContractProposals from './OpenContractProposalsReducer';
import settings from './SettingsReducer';
import signin from './SigninReducer';
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

export default combineReducers({
    appState,
    appConfig,
    account,
    assets,
    assetPicker,
    createAccount,
    news,
    paymentAgent,
    portfolio,
    contracts,
    openContractProposals,
    proposals,
    quickTrade,
    settings,
    signin,
    states,
    transactions,
    ticks,
    tickTrade,
    tradingOptions,
    upgrade,
    video,
    workspace,
    watchlist,
    trades,
});
