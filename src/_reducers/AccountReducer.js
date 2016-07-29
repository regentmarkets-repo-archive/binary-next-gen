import { fromJS } from 'immutable';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
    UPDATE_TOKEN,
    REMOVE_PERSONAL_DATA,
    SET_DEFAULT_CURRENCY,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    loginid: '',
    fullname: '',
    balance: 0,
    token: '',
    currencies: ['USD'],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const authorize = fromJS(action.serverResponse.authorize);
            if (authorize.get('currency') === '') {                 // do not merge empty currency
                return state.merge(authorize.delete('currency'));
            }
            return state.merge(authorize);
        }
        case SET_DEFAULT_CURRENCY: {
            const currency = state.get('currency');
            if (!currency || currency === '') {
                return state.set('currency', action.currency);
            }
            return state;
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
        case UPDATE_TOKEN: {
            return state.set('token', action.token);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
