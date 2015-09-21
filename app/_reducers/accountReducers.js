import {
    SERVER_DATA_AUTHORIZE,
} from '../_constants/ActionTypes';

const initialState = {};

export default function serverData(state = initialState, action) {
    switch (action.type) {
        case SERVER_DATA_AUTHORIZE: {
            const { currency, balance, loginid, fullname } = action.serverResponse.data;
            return {
                ...state,
                account: {
                    balance: {
                        currency,
                        amount: +balance,
                    },
                    loginid,
                    fullname,
                },
            };
        }
        default:
            return state;
    }
}
