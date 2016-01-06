import { combineReducers } from 'redux';

import appInfo from './AppInfoReducers';
import account from './AccountReducers';
import assets from './AssetsReducers';
import assetSelector from './AssetSelectorReducers';
import portfolio from './PortfolioReducers';
import settings from './SettingsReducers';
import signin from './SigninReducers';
import statement from './StatementReducers';
import ticks from './TickReducers';
import profitTable from './ProfitTableReducers';
import tickTrade from './TickTradeReducers';
import workspace from './WorkspaceReducers';
import watchlist from './WatchlistReducers';
import video from './VideoReducers';
import news from './NewsReducers';
import paymentAgent from './PaymentAgentReducers';
import createAccount from './CreateAccountReducers';
import upgrade from './UpgradeReducers';
import states from './StatesReducer';
import tradingOptions from './TradingOptionsReducer';
import proposals from './ProposalsReducers';
import quickTrade from './QuickTradeReducers';

export default combineReducers({
    appInfo,
    account,
    assets,
    assetSelector,
    createAccount,
    news,
    paymentAgent,
    portfolio,
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
});
