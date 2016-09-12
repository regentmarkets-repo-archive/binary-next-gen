import { api } from '../_data/LiveData';
import { UPDATE_CHART_DATA_BY_CONTRACT, UPDATE_CHART_DATA_BY_SYMBOL,
    RESET_CHART_DATA_BY_CONTRACT, RESET_CHART_DATA_BY_SYMBOL } from '../_constants/ActionTypes';
import { getOpenContract } from './PortfolioActions';

export const updateChartDataByContract = (contractID, data, dataType, symbol, isSold) => ({
    type: UPDATE_CHART_DATA_BY_CONTRACT,
    contractID,
    data,
    dataType,
    symbol,
    isSold,
});

export const getDataForContract = (contractID, style, subscribe) =>
    dispatch =>
        api.getDataForContract(
            () => dispatch(getOpenContract(contractID)),
            undefined,
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

export const getDataForSymbol = (symbol, duration, style, subscribe) =>
    dispatch =>
        api.getDataForSymbol(symbol, duration, style, subscribe)
            .then(r => {
                const { ticks, candles } = r;
                return dispatch(updateChartDataBySymbol(symbol, ticks || candles, style));
            });

export const resetChartDataForSymbol = (symbol, data) => ({
    type: RESET_CHART_DATA_BY_SYMBOL,
    symbol,
    data,
});

export const resetChartDataForContract = (contractID, data) => ({
    type: RESET_CHART_DATA_BY_CONTRACT,
    contractID,
    data,
});
