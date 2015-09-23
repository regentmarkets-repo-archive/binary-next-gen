import { combineReducers } from 'redux';

import account from './AccountReducers';
import markets from './MarketsReducers';
import portfolio from './PortfolioReducers';
import statement from './StatementReducers';
import ticks from './TickReducers';
import tradingTimes from './TradingTimesReducers';

export default combineReducers({
    account,
    markets,
    portfolio,
    statement,
    ticks,
    tradingTimes,
});
