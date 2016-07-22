import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { trackEvent } from 'binary-utils/lib/Analytics';
import numberToSignedString from 'binary-utils/lib/numberToSignedString';
import { updateOpenContractField } from './PortfolioActions';
import { getDataForContract } from './ChartDataActions';
import { getTradingOptions } from './TradingOptionsActions';
import { getTicksBySymbol } from './TickActions';

// Handle server proposal stream
export const serverDataProposal = serverResponse => ({
    type: types.SERVER_DATA_PROPOSAL,
    serverResponse,
});

// Trade object life cycle
export const removeTrade = index =>
    (dispatch, getState) => {
        const proposalInfoList = getState().tradesProposalInfo.toJS();
        if (proposalInfoList.length === 1) {
            return;
        }

        const proposalInfo = proposalInfoList[index];

        if (proposalInfo && proposalInfo.proposal) {
            LiveData.api.unsubscribeByID(proposalInfo.proposal.id);
        }

        dispatch({ type: types.REMOVE_TRADE, index });
    };

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

const subscriptionQueue = [
    Promise.resolve(),
    Promise.resolve(),
    Promise.resolve(),
    Promise.resolve(),
    Promise.resolve(),
];

export const updatePriceProposalSubscription = (tradeID, trade) =>
    (dispatch, getState) => {
        subscriptionQueue[tradeID].then(() => {
            dispatch(updateTradeUIState(tradeID, 'disabled', true));
            if (!getState().tradesParams.get(tradeID)) {
                return;
            }
            const tradeParam = trade || getState().tradesParams.get(tradeID).toJS();
            const { proposal } = getState().tradesProposalInfo.get(tradeID).toJS();
            const currency = getState().account.get('currency');
            const {
                amount,
                basis,
                type,
                dateStart,
                duration,
                durationUnit,
                symbol,
                barrier,
                barrier2,
                amountPerPoint,
                stopType,
                stopProfit,
                stopLoss,
                barrierType,
            } = tradeParam;

            if (!(amount && basis && type && symbol)) {
                return;
            }

            const b1 = barrier && (barrierType === 'relative' ? numberToSignedString(barrier) : barrier);
            const b2 = barrier2 && (barrierType === 'relative' ? numberToSignedString(barrier2) : barrier2);

            if (proposal) {
                LiveData.api.unsubscribeByID(proposal.id);
            }

            subscriptionQueue[tradeID] = LiveData.api.subscribeToPriceForContractProposal({
                amount,
                basis,
                contract_type: type,
                duration,
                date_start: dateStart,
                currency,
                duration_unit: durationUnit,
                symbol,
                barrier: b1,
                barrier2: b2,
                amount_per_point: amountPerPoint,
                stop_type: stopType,
                stop_profit: stopProfit,
                stop_loss: stopLoss,
            })
                .then(
                    response => {
                        if (getState().tradesParams.get(tradeID)) {
                            dispatch(updateTradeError(tradeID, 'proposalError', undefined));
                            dispatch(updateTradeProposal(tradeID, 'proposal', response.proposal));
                        } else {
                            LiveData.api.unsubscribeByID(response.proposal.id);
                        }
                    },
                    err => {
                        dispatch(updateTradeError(tradeID, 'proposalError', err.message));
                        dispatch(updateTradeProposal(tradeID, 'proposal', undefined));
                    })
                .then(() => dispatch(updateTradeUIState(tradeID, 'disabled', false)));
            });
    };

export const resubscribeAllPriceProposal = () =>
    (dispatch, getState) => {
        const allTrades = getState().tradesParams.keySeq();
        allTrades.forEach(tradeId => dispatch(updatePriceProposalSubscription(tradeId)));
    };

// Handle trade's purchase related operation
export const updatePurchaseInfo = (index, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_PURCHASE_INFO,
    index,
    fieldName,
    fieldValue,
});

export const purchaseByTradeId = (tradeID, trade) =>
    (dispatch, getState) => {
        dispatch(updateTradeUIState(tradeID, 'disabled', true));
        const proposalSelected = trade || getState().tradesProposalInfo.get(tradeID).toJS();
        trackEvent('Trade', 'Buy', JSON.stringify(proposalSelected));
        const proposalID = proposalSelected.proposal.id;
        const price = proposalSelected.proposal.ask_price;

        return LiveData.api.buyContract(proposalID, price)
            .then(
                response => {
                    dispatch(updatePurchaseInfo(tradeID, 'receipt', response.buy));
                    dispatch(updatePurchaseInfo(tradeID, 'mostRecentContractId', response.buy.contract_id));
                    return LiveData.api
                        .subscribeToOpenContract(response.buy.contract_id)
                        .then(() => dispatch(getDataForContract(response.buy.contract_id, 1, 'all', 'ticks')));
                },
                err => dispatch(updateTradeError(tradeID, 'purchaseError', err.message))
            )
            .then(() => {
                dispatch(updateTradeUIState(tradeID, 'disabled', false));
                return dispatch(updatePriceProposalSubscription(tradeID));
            });
    };

export const sellExpiredContract = onDone => {
    LiveData.api.sellExpiredContracts().then(response => {
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
            await LiveData.api.sellContract(id, price);
            dispatch(updateOpenContractField({ id, selling: false }));
            await trackEvent('Trade', 'Sell', price);
        } catch (error) {
            dispatch(updateOpenContractField({ id, validation_error: error }));
        }
    };

export const selectAsset = asset =>
    dispatch => dispatch(getTradingOptions(asset))
        .then(() => dispatch(getTicksBySymbol(asset)));
