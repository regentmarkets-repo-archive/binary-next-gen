import { combineReducers } from 'redux';

import markets from './markets';
import serverData from './serverData';
import portfolios from './PortfolioReducers';
import ticks from './TickReducers';

export default combineReducers({
    markets,
    serverData,
    portfolios,
    ticks,
});
