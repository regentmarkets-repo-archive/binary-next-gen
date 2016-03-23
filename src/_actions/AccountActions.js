import * as types from '../_constants/ActionTypes';

export const serverDataAuthorize = serverResponse => ({
    type: types.SERVER_DATA_AUTHORIZE,
    serverResponse,
});

export const serverDataBalance = serverResponse => ({
    type: types.SERVER_DATA_BALANCE,
    serverResponse,
});

export const serverDataPayoutCurrencies = serverResponse => ({
    type: types.SERVER_DATA_PAYOUT_CURRENCIES,
    serverResponse,
});

export const updateToken = token => ({
    type: types.UPDATE_TOKEN,
    token,
});

export const removePersonalData = () => ({
    type: types.REMOVE_PERSONAL_DATA,
});
