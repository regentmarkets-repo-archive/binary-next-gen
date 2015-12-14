import * as types from '../_constants/ActionTypes';

export const signupFieldUpdate = (fieldName, fieldValue) => ({
    type: types.SIGNUP_FIELD_UPDATE,
    fieldName,
    fieldValue,
});

export const signupStart = () => ({
    type: types.SIGNUP_START,
});

export const signupFailed = (serverResponse) => ({
    type: types.SIGNUP_FAILED,
    serverResponse,
});
