import { UPDATE_BOOT } from '../_constants/ActionTypes';

export const updateBoot = (field, value) => ({
    type: UPDATE_BOOT,
    field,
    value,
});
