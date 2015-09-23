import { Map } from 'immutable';

import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
} from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const { currency, balance, loginid, fullname } = action.serverResponse.data;

            return state.merge({
                balance: {
                    currency,
                    amount: +balance,
                },
                loginid,
                fullname,
            });
        }
        case SERVER_DATA_BALANCE:
            return state.set('balances', action.serverResponse.data);
        default:
            return state;
    }
};
