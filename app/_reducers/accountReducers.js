import { Map } from 'immutable';

import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
} from '../_constants/ActionTypes';

const initialState = new Map({
    balances: [],
    loginid: '',
    fullname: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            return state.merge(action.serverResponse.authorize);
        }
        case SERVER_DATA_BALANCE:
            return state.set('balances', action.serverResponse.balance);
        default:
            return state;
    }
};
