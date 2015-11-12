import { combineReducers } from 'redux';

import account from './AccountReducers';
import assets from './AssetsReducers';
import assetSelector from './AssetSelectorReducers';
import portfolio from './PortfolioReducers';
import signin from './SigninReducers';
import statement from './StatementReducers';
import ticks from './TickReducers';
import profitTable from './ProfitTableReducers';
import tickTrade from './TickTradeReducers';
import workspace from './WorkspaceReducers';
import video from './VideoReducers';
import dailyReport from './DailyReportReducers';

export default combineReducers({
    account,
    assets,
    assetSelector,
    portfolio,
    signin,
    statement,
    ticks,
    tickTrade,
    profitTable,
    workspace,
    video,
    dailyReport,
});
