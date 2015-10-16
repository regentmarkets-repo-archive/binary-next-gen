import { fromJS } from 'immutable';

import {
    SERVER_DATA_PROFIT_TABLE,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    detailsShown: false,
    contractShown: undefined,
    transactions: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROFIT_TABLE: {
            return state.set('transactions', action.serverResponse.profit_table.transactions);
        }
        default:
            return state;
    }
};
