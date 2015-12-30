import { fromJS } from 'immutable';

import {
    SERVER_DATA_STATEMENT,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    transactions: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATEMENT: {
            const newTx = action.serverResponse.statement
                .transactions
                .reduce((pv, cv) => pv.set(cv.transaction_id, cv), state.get('transactions'));
            return state.set('transactions', newTx);
        }
        default:
            return state;
    }
};
