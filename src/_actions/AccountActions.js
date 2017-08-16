import * as types from '../_constants/ActionTypes';

export const serverDataAuthorize = (serverResponse: ApiResponse) => ({
    type: types.SERVER_DATA_AUTHORIZE,
    serverResponse,
});

export const serverDataBalance = (serverResponse: ApiResponse) => ({
    type: types.SERVER_DATA_BALANCE,
    serverResponse,
});

export const serverDataPayoutCurrencies = (serverResponse: ApiResponse) => ({
    type: types.SERVER_DATA_PAYOUT_CURRENCIES,
    serverResponse,
});

export const updateToken = (token: string) => ({
    type: types.UPDATE_TOKEN,
    token,
});

export const removePersonalData = () => ({
    type: types.REMOVE_PERSONAL_DATA,
});

