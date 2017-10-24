/* @flow */

import { trackEvent } from 'binary-utils/lib/misc/Analytics';
import * as types from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';
import { updateOpenContractField } from './PortfolioActions';
import { getTradingOptions } from './TradingOptionsActions';
import { getTicksBySymbol } from './TickActions';

// Handle server proposal stream
export const serverDataProposal = serverResponse => ({
    type: types.SERVER_DATA_PROPOSAL,
    serverResponse,
});

export const resetTrades = () => ({
    type: types.RESET_TRADES,
});

// Update trade's params
export const updateTradeParams = (index, fieldName, fieldValue) => {
    trackEvent('Trade', 'Parameter', fieldName + ' = ' + fieldValue);
    return {
        type: types.UPDATE_TRADE_PARAMS,
        index,
        fieldName,
        fieldValue,
    };
};

// Update trade view chart params
export const updateTradeViewChartParams = (index, chartParams) => {
    trackEvent('Trade', 'Chart Params', JSON.stringify(chartParams));
    return {
        type: types.UPDATE_TRADE_VIEW_CHART_PARAMS,
        index,
        chartParams,
    };
};

export const updateMultipleTradeParams = (index, params) => {
    trackEvent('Trade', 'Multiple Params', JSON.stringify(params));
    return {
        type: types.UPDATE_MULTIPLE_TRADE_PARAMS,
        index,
        params,
    };
};

// Update trade's ui state
export const updateTradeUIState = (index, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_UI_STATE,
    index,
    fieldName,
    fieldValue,
});

export const closeContractReceipt = index => ({
    type: types.CLOSE_CONTRACT_RECEPIT,
    index,
});

// Update trade's price proposal
export const updateTradeProposal = (index, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_PROPOSAL,
    index,
    fieldName,
    fieldValue,
});

export const updateTradeError = (index, errorID, error) => ({
    type: types.UPDATE_TRADE_ERROR,
    index,
    errorID,
    error,
});

export const clearTradeError = index => ({
    type: types.CLEAR_TRADE_ERROR,
    index,
});

// Handle trade's purchase related operation
export const updatePurchasedContract = (index, receipt) => ({
    type: types.PURCHASED_CONTRACT,
    index,
    receipt,
});

export const sellExpiredContract = onDone => {
    api.sellExpiredContracts().then(response => {
        if (onDone) {
            onDone(response.sell_expired);
        }
    });
};

export const sellContract = (id, price) =>
    async (dispatch, getState) => {
        const contract = getState().boughtContracts.get(id);
        if (!contract) {
            return;
        }
        try {
            dispatch(updateOpenContractField({ id, selling: true }));
            await api.sellContract(id, price);
            dispatch(updateOpenContractField({ id, selling: false }));
            await trackEvent('Trade', 'Sell', price);
        } catch (error) {
            dispatch(updateOpenContractField({ id, validation_error: error }));
        }
    };

export const selectAsset = asset =>
    dispatch => dispatch(getTradingOptions(asset))
        .then(() => dispatch(getTicksBySymbol(asset)));

export const updateOutdatedStartDate = () => ({
    type: types.UPDATE_OUTDATED_START_DATE,
});
