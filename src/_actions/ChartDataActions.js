import { api } from '../_data/LiveData';
import { UPDATE_CHART_DATA } from '../_constants/ActionTypes';

export const getDataForContract = (contractID, durationType, durationCount) =>
    dispatch =>
        api.getDataForContract(contractID, durationType, durationCount)
            .then(ticks =>
                dispatch({
                    type: UPDATE_CHART_DATA,
                    data: ticks,
                    contractID,
                    dataType: 'ticks',
                })
            );
