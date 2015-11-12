import { fromJS } from 'immutable';
import StateStorage from '../_store/StateStorage';

import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
    SERVER_DATA_ACCOUNT_LIMITS,
    SERVER_DATA_ACCOUNT_SETTINGS,
} from '../_constants/ActionTypes';

const initialState = fromJS(StateStorage.get('account') || {
    loginid: '',
    fullname: '',
    currency: '',
    balance: 0,
    currencies: ['USD'],
    limits: {},
    settings: {},
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
        case SERVER_DATA_ACCOUNT_LIMITS: {
            return state.set('limits', action.serverResponse.get_limits);
        }
        case SERVER_DATA_ACCOUNT_SETTINGS: {
            return state.set('settings', action.serverResponse.get_settings);
        }
        default:
            return state;
    }
};
