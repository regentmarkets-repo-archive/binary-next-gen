import { fromJS } from 'immutable';
import {
  SERVER_DATA_AUTHORIZE,
  SERVER_DATA_BALANCE,
  SERVER_DATA_PAYOUT_CURRENCIES,
  SERVER_DATA_BUY,
  UPDATE_TOKEN,
  REMOVE_PERSONAL_DATA,
  SERVER_DATA_WEBSITE_STATUS,
  UPDATE_LANDING_COMPANY,
  SET_AVAILABLE_CURRENCIES,
  SET_DEFAULT_CURRENCY,
  UPDATE_SUPPORTED_LANGUAGES
} from '../_constants/ActionTypes';

const initialState = fromJS({
    loginid: '',
    fullname: '',
    balance: 0,
    token: '',
    currency: '',
    currencies: ['USD'],
    currencies_config: { }, // "USD": { "fractional_digits": 2, "stake_default": 0.35, "type": "fiat" }
    landing_company: { },
    available_currencies: { },
    default_currency: 'USD',
    languages: [{
        value: 'EN',
        text: 'English',
    }],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const { authorize } = action.serverResponse;
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
        case UPDATE_LANDING_COMPANY: {
            return state.set('landing_company', action.landing_company);
        }
        case SET_AVAILABLE_CURRENCIES: {
            return state.set('available_currencies', action.available_currencies);
        }
        case SET_DEFAULT_CURRENCY: {
            return state.set('default_currency', action.default_currency);
        }
        case UPDATE_SUPPORTED_LANGUAGES: {
            return state.set('languages', action.languages);
        }
        default:
            return state;
    }
};
