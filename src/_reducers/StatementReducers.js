import { Map } from 'immutable';

import {
    SERVER_DATA_STATEMENT,
} from '../_constants/ActionTypes';

const initialState = new Map({
    transactions: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATEMENT: {
            return state.set('transactions', action.serverResponse.statement.transactions);
        }
        default:
            return state;
    }
};
