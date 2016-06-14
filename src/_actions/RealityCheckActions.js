import { UPDATE_REALITY_CHECK } from '../_constants/ActionTypes';

export const updateRealityCheck = (fieldName, fieldValue) => ({
    type: UPDATE_REALITY_CHECK,
    fieldName,
    fieldValue,
});
