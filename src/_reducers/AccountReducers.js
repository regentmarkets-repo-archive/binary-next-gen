import { fromJS } from 'immutable';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    loginid: '',
    fullname: '',
    currency: '',
    balance: 0,
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
        default:
            return state;
    }
};
