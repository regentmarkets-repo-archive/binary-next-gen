import * as types from '../_constants/ActionTypes';

export const createAccountFieldUpdate = (fieldName, fieldValue) => ({
    type: types.CREATE_ACCOUNT_FIELD_UPDATE,
    fieldName,
    fieldValue,
});

export const createAccountStart = () => ({
    type: types.CREATE_ACCOUNT_START,
});

export const createAccountFailed = (serverResponse) => ({
    type: types.CREATE_ACCOUNT_ERROR,
    serverResponse,
});
