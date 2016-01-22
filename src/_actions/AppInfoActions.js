import { UPDATE_APP_INFO } from '../_constants/ActionTypes';

export const updateAppInfo = (field, value) => ({
    type: UPDATE_APP_INFO,
    field,
    value,
});
