import { UPDATE_APP_CONFIG } from '../_constants/ActionTypes';

export const updateAppConfig = (field, value) => ({
    type: UPDATE_APP_CONFIG,
    field,
    value,
});
