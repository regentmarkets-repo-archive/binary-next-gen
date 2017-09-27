import { fromJS } from 'immutable';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
    UPDATE_TOKEN,
    REMOVE_PERSONAL_DATA,
    SERVER_DATA_WEBSITE_STATUS,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    loginid: '',
    fullname: '',
    balance: 0,
    token: '',
    currency: 'USD',
    currencies: ['USD'],
    currencies_config: { } // "USD": { "fractional_digits": 2, "stake_default": 0.35, "type": "fiat" }
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const { authorize } = action.serverResponse;
            if (authorize.currency === '') {
                return state.merge(authorize).set('currency', 'USD');
            }
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
        case UPDATE_TOKEN: {
            return state.set('token', action.token);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        case SERVER_DATA_WEBSITE_STATUS: {
          const { website_status } = action.serverResponse;
          const currencies_config = fromJS(website_status.currencies_config);

          return state.set('currencies_config', currencies_config);
        }
        default:
            return state;
    }
};
