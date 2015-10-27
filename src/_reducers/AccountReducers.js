import { Map } from 'immutable';
import StateStorage from '../_store/StateStorage';

import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
} from '../_constants/ActionTypes';

const initialState = new Map(StateStorage.get('account') || {
    balances: [],
    loginid: '',
    fullname: '',
    currency: '',
    balance: 0,
    currencies: ['USD'],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            return state.merge(action.serverResponse.authorize);
        }
        case SERVER_DATA_BALANCE: {
            return state.set('balances', action.serverResponse.balance);
        }
        case SERVER_DATA_BUY: {
            return state.setIn(['account', 'balance'], action.serverResponse.balance_after);
        }
        case SERVER_DATA_PAYOUT_CURRENCIES: {
            return state.set('currencies', action.serverResponse.payout_currencies);
        }
        default:
            return state;
    }
};
