import { combineReducers } from 'redux';

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
import signup from './SignupReducers';
import upgrade from './UpgradeReducers';
import states from './StatesReducer';

export default combineReducers({
    account,
    assets,
    assetSelector,
    portfolio,
    settings,
    signin,
    statement,
    ticks,
    tickTrade,
    profitTable,
    workspace,
    watchlist,
    video,
    news,
    paymentAgent,
    signup,
    upgrade,
    states,
});
