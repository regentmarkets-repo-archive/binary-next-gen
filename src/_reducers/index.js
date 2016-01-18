import { combineReducers } from 'redux';

import appInfo from './AppInfoReducer';
import account from './AccountReducer';
import assets from './AssetsReducer';
import assetPicker from './AssetPickerReducer';
import portfolio from './PortfolioReducer';
import contracts from './ContractsReducer';
import openContractProposals from './OpenContractProposalsReducer';
import settings from './SettingsReducer';
import signin from './SigninReducer';
import statement from './StatementReducer';
import ticks from './TickReducer';
import profitTable from './ProfitTableReducer';
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
import trade from './TradeReducer';

export default combineReducers({
    appInfo,
    account,
    assets,
    assetPicker,
    createAccount,
    news,
    paymentAgent,
    portfolio,
    contracts,
    openContractProposals,
    profitTable,
    proposals,
    quickTrade,
    settings,
    signin,
    states,
    statement,
    ticks,
    tickTrade,
    tradingOptions,
    upgrade,
    video,
    workspace,
    watchlist,
    trade,
});
