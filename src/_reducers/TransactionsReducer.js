import { fromJS } from 'immutable';

import {
    SERVER_DATA_STATEMENT,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATEMENT: {
            // const newTransactions = action.serverResponse.statement.transactions
            //     .reduce((prev, cur) => prev.set(cur.transaction_id, cur), state.get('transactions'));
            // return state.merge(newTransactions);
            return state.merge(action.serverResponse.statement.transactions);
        }
        default:
            return state;
    }
};
