import { Map } from 'immutable';

import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
} from '../_constants/ActionTypes';

const initialState = new Map({
    balances: [],
    loginid: '',
    fullname: '',
    currencies: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            return state.merge(action.serverResponse.authorize);
        }
        case SERVER_DATA_BALANCE:
            return state.set('balances', action.serverResponse.balance);
        case SERVER_DATA_PAYOUT_CURRENCIES:
            return state.set('currencies', action.serverResponse.payout_currencies);
        default:
            return state;
    }
};
