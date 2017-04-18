import { fromJS } from 'immutable';
import { SERVER_DATA_ACTIVE_SYMBOLS } from '../_constants/ActionTypes';

const initialState = fromJS([]);

const priority = ['volidx', 'forex', 'indices', 'commodities', 'stocks'];
const sortByPriority = symbols =>
    symbols.sort((a, b) => {
        const aPriority = priority.indexOf(a.market);
        const bPriority = priority.indexOf(b.market);
        if (aPriority === bPriority) {
            return a.submarket.localeCompare(b.submarket);
        }

        return aPriority - bPriority;
    });

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ACTIVE_SYMBOLS: {
            const activeSymbols = action.serverResponse.active_symbols.filter(
                a => {
                    const isOpen = a.exchange_is_open === 1;
                    const allowStartLater = a.allow_forward_starting === 1;
                    const suspended = a.is_trading_suspended === 1;
                    return !suspended && (isOpen || allowStartLater);
                },
            );
            return fromJS(sortByPriority(activeSymbols));
        }
        default:
            return state;
    }
};
