import { List, fromJS } from 'immutable';

import {
    SERVER_DATA_PROFIT_TABLE,
} from '../_constants/ActionTypes';

const initialState = new List();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROFIT_TABLE: {
            const transactions = action.serverResponse.profit_table.transactions;
            return fromJS(transactions || []);
        }
        default:
            return state;
    }
};
