import { fromJS } from 'immutable';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
    SERVER_AUTH_FAILED,
    ADD_TOKEN,
    REMOVE_TOKEN,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    loginid: '',
    fullname: '',
    currency: '',
    balance: 0,
    token: '',
    currencies: ['USD'],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const authorize = fromJS(action.serverResponse.authorize);
            return state.merge(authorize);
        }
        case SERVER_DATA_BALANCE: {
            return state.set('balance', action.serverResponse.balance.balance);
        }
        case SERVER_DATA_BUY: {
            return state.setIn(['account', 'balance'], action.serverResponse.balance_after);
        }
        case SERVER_DATA_PAYOUT_CURRENCIES: {
            return state.set('currencies', action.serverResponse.payout_currencies);
        }
        case SERVER_AUTH_FAILED: {
            return state.set('token', '');
        }
        case ADD_TOKEN: {
            return state.set('token', action.token);
        }
        case REMOVE_TOKEN: {
            return state.set('token', '');
        }
        default:
            return state;
    }
};
