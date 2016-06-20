import { UPDATE_REALITY_CHECK, UPDATE_REALITY_CHECK_SUMMARY } from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';

export const updateRealityCheck = (fieldName, fieldValue) => ({
    type: UPDATE_REALITY_CHECK,
    fieldName,
    fieldValue,
});

export const updateRealityCheckSummary = () =>
    dispatch =>
        api.getRealityCheckSummary()
            .then(s => {
                const summary = s.reality_check;
                return dispatch({
                    type: UPDATE_REALITY_CHECK_SUMMARY,
                    summary,
                });
            });
