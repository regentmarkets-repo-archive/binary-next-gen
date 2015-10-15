import { combineReducers } from 'redux';

import account from './AccountReducers';
import assets from './AssetReducers';
import portfolio from './PortfolioReducers';
import statement from './StatementReducers';
import ticks from './TickReducers';
import profitTable from './ProfitTableReducers';
import tickTrade from './TickTradeReducers';
import workspace from './WorkspaceReducers';

export default combineReducers({
    account,
    assets,
    portfolio,
    statement,
    ticks,
    tickTrade,
    profitTable,
    workspace,
});
