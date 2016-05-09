import { api } from '../_data/LiveData';
import { UPDATE_CHART_DATA_BY_CONTRACT, UPDATE_CHART_DATA_BY_SYMBOL } from '../_constants/ActionTypes';

export const getDataForContract = (contractID, durationCount, durationType) =>
    dispatch =>
        api.getDataForContract(contractID, durationCount, durationType)
            .then(ticks =>
                dispatch({
                    type: UPDATE_CHART_DATA_BY_CONTRACT,
                    contractID,
                    data: ticks,
                    dataType: 'ticks',
                })
            );

export const getDataForSymbol = (symbol, durationCount, durationType) =>
    dispatch =>
        api.getDataForSymbol(symbol, durationCount, durationType)
            .then(ticks =>
                dispatch({
                    type: UPDATE_CHART_DATA_BY_SYMBOL,
                    symbol,
                    data: ticks,
                    dataType: 'ticks',
                })
            );
