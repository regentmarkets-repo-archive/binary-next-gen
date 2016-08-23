import { api } from '../_data/LiveData';
import { UPDATE_CHART_DATA_BY_CONTRACT, UPDATE_CHART_DATA_BY_SYMBOL } from '../_constants/ActionTypes';
import { getOpenContract } from './PortfolioActions';

export const updateChartDataByContract = (contractID, data, dataType, symbol, isSold) => ({
    type: UPDATE_CHART_DATA_BY_CONTRACT,
    contractID,
    data,
    dataType,
    symbol,
    isSold,
});

export const getDataForContract = (contractID, durationCount, durationType, style, subscribe) =>
    dispatch =>
        api.getDataForContract(
            () => dispatch(getOpenContract(contractID)),
            durationCount,
            durationType,
            style,
            subscribe
        ).then(r => {
            const { ticks, candles, symbol, isSold } = r;
            return dispatch(updateChartDataByContract(contractID, ticks || candles, style, symbol, isSold));
        });

export const updateChartDataBySymbol = (symbol, data, dataType) => ({
    type: UPDATE_CHART_DATA_BY_SYMBOL,
    symbol,
    data,
    dataType,
});

export const getDataForSymbol = (symbol, durationCount, durationType, style, subscribe) =>
    dispatch =>
        api.getDataForSymbol(symbol, durationCount, durationType, style, subscribe)
            .then(r => {
                const { ticks, candles } = r;
                return dispatch(updateChartDataBySymbol(symbol, ticks || candles, style));
            });
