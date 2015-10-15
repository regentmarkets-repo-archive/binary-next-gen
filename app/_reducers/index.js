import { combineReducers } from 'redux';

import account from './AccountReducers';
import assets from './AssetsReducers';
import assetSelector from './AssetSelectorReducers';
import portfolio from './PortfolioReducers';
import statement from './StatementReducers';
import ticks from './TickReducers';
import profitTable from './ProfitTableReducers';
import tickTrade from './TickTradeReducers';
import workspace from './WorkspaceReducers';

export default combineReducers({
    account,
    assets,
    assetSelector,
    portfolio,
    statement,
    ticks,
    tickTrade,
    profitTable,
    workspace,
});
