import * as types from '../_constants/ActionTypes';

export const signinStart = () => ({
    type: types.SIGNIN_START,
});

export const signinFieldUpdate = (fieldName, fieldValue) => ({
    type: types.SIGNIN_FIELD_UPDATE,
    fieldName,
    fieldValue,
});
