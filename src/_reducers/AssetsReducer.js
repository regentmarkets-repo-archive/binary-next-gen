import { fromJS } from 'immutable';
import {
    SERVER_DATA_ACTIVE_SYMBOLS,
} from '../_constants/ActionTypes';

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
            const activeSymbols = action.serverResponse.active_symbols;
            return fromJS(sortByPriority(activeSymbols));
        }
        default:
            return state;
    }
};
