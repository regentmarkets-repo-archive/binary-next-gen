import * as types from '../_constants/ActionTypes';

export function serverDataAuthorize(serverResponse) {
    return {
        type: types.SERVER_DATA_AUTHORIZE,
        serverResponse,
    };
}

export function serverDataBalance(serverResponse) {
    return {
        type: types.SERVER_DATA_BALANCE,
        serverResponse,
    };
}

export function serverDataPayoutCurrencies(serverResponse) {
    return {
        type: types.SERVER_DATA_PAYOUT_CURRENCIES,
        serverResponse,
    };
}

export function serverDataAccountLimits(serverResponse) {
    return {
        type: types.SERVER_DATA_ACCOUNT_LIMITS,
        serverResponse,
    };
}

export function serverDataAccountSettings(serverResponse) {
    return {
        type: types.SERVER_DATA_ACCOUNT_SETTINGS,
        serverResponse,
    };
}
