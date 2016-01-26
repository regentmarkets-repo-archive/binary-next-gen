import { UPDATE_APP_STATE } from '../_constants/ActionTypes';

export const updateAppState = (field, value) => ({
    type: UPDATE_APP_STATE,
    field,
    value,
});
