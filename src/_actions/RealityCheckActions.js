import { UPDATE_REALITY_CHECK, UPDATE_REALITY_CHECK_SUMMARY } from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';

export const updateRealityCheck = properties => ({
    type: UPDATE_REALITY_CHECK,
    properties,
});

export const updateRealityCheckInterval = interval => updateRealityCheck({ interval });

export const disableRealityCheck = () => updateRealityCheck({
    showInitial: false,
    showSummary: false,
});

export const initRealityCheck = () => updateRealityCheck({
    acknowledged: false,
    showInitial: true,
    showSummary: false,
});

export const showRealityCheckPopUp = () => updateRealityCheck({
    acknowledged: false,
    showInitial: false,
    showSummary: true,
});

export const ackRealityCheck = () => updateRealityCheck({
    acknowledged: true,
    showInitial: false,
    showSummary: false,
});

export const setRealityCheckStartTime = realityCheckStartTime => updateRealityCheck({ realityCheckStartTime });

export const updateRealityCheckSummary = () =>
    dispatch =>
        api.getRealityCheckSummary()
            .then(s => {
                const summary = s.reality_check;
                if (Object.keys(summary).length > 0) {
                    return dispatch({
                        type: UPDATE_REALITY_CHECK_SUMMARY,
                        summary,
                    });
                }
                return undefined;
            });
