import { api } from '../_data/LiveData';
import { UPDATE_CHART_DATA_BY_CONTRACT, UPDATE_CHART_DATA_BY_SYMBOL } from '../_constants/ActionTypes';
import { getOpenContract } from './PortfolioActions';

export const getDataForContract = (contractID, durationCount, durationType) =>
    dispatch =>
        api.getDataForContract(() => dispatch(getOpenContract(contractID)), durationCount, durationType)
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
