import { combineReducers } from 'redux';

import account from './accountReducers';
import markets from './marketsReducers';
import serverData from './serverData';
import portfolio from './PortfolioReducers';
import ticks from './TickReducers';

export default combineReducers({
    account,
    markets,
    serverData,
    portfolio,
    ticks,
});
