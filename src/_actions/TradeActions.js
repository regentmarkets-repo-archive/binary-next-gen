import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { changeActiveTrade } from './WorkspaceActions';
import { trackEvent } from 'binary-utils/lib/Analytics';
import numberToSignedString from 'binary-utils/lib/numberToSignedString';
import { updateOpenContractField } from './PortfolioActions';
import { getTicksBySymbol } from './TickActions';
import { getTradingOptions } from './TradingOptionsActions';

// Handle server proposal stream
export const serverDataProposal = serverResponse => ({
    type: types.SERVER_DATA_PROPOSAL,
    serverResponse,
});

// Trade object life cycle
export const createTrade = symbol =>
    (dispatch, getState) => {
        const contractExist = getState().tradingOptions.get(symbol);
        const ticksExist = getState().ticks.get(symbol);
        const tradesLen = getState().trades.size;

        const contractP = !!contractExist ? Promise.resolve() : dispatch(getTradingOptions(symbol));
        const ticksP = !!ticksExist ? Promise.resolve() : dispatch(getTicksBySymbol(symbol));

        Promise.all([contractP, ticksP])
            .then(
                () => {
                    dispatch({ type: types.CREATE_TRADE, symbol });
                    dispatch(changeActiveTrade(tradesLen));
                }
            );
    };

export const removeTrade = index =>
    (dispatch, getState) => {
        const trades = getState().trades.toJS();
        if (trades.length === 1) {
            return;
        }

        const trade = trades[index];

        if (trade.proposal) {
            LiveData.api.unsubscribeByID(trade.proposal.id);
        }

        dispatch({ type: types.REMOVE_TRADE, index });
    };

export const resetTrades = () => ({
    type: types.RESET_TRADES,
});

// Update trade's params
export const updateTradeParams = (index, fieldName, fieldValue) => {
    trackEvent('update-trade-paremeters', { fieldName, fieldValue });
    return {
        type: types.UPDATE_TRADE_PARAMS,
        index,
        fieldName,
        fieldValue,
    };
};

export const updateMultipleTradeParams = (index, params) => {
    trackEvent('update-trade-paremeters', params);
    return {
        type: types.UPDATE_MULTIPLE_TRADE_PARAMS,
        index,
        params,
    };
};

// Update trade's ui state
export const updateTradeUIState = (tradeID, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_UI_STATE,
    tradeID,
    fieldName,
    fieldValue,
});

export const closeContractReceipt = index => ({
    type: types.CLOSE_CONTRACT_RECEPIT,
    index,
});

// Update trade's price proposal
export const updateTradeProposal = (tradeID, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_PROPOSAL,
    tradeID,
    fieldName,
    fieldValue,
});

export const updatePriceProposalSubscription = (tradeID, trade) => {
    const thunk = (dispatch, getState) => {
        dispatch(updateTradeUIState(tradeID, 'disabled', true));
        const tradeObj = trade || getState().trades.get(tradeID).toJS();
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
            proposal,
            barrierType,
        } = tradeObj.params;

        if (!(amount && basis && type && symbol)) {
            return;
        }

        const b1 = barrier && (barrierType === 'relative' ? numberToSignedString(barrier) : barrier);
        const b2 = barrier2 && (barrierType === 'relative' ? numberToSignedString(barrier2) : barrier2);

        if (proposal) {
            const proposalID = proposal.id;
            LiveData.api.unsubscribeByID(proposalID);
        }
        LiveData.api.subscribeToPriceForContractProposal({
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
        }).then(
            response => {
                dispatch(updateTradeProposal(tradeID, 'proposalError', undefined));
                dispatch(updateTradeProposal(tradeID, 'proposal', response.proposal));
            },
            err => {
                dispatch(updateTradeProposal(tradeID, 'proposalError', err));
                dispatch(updateTradeProposal(tradeID, 'proposal', undefined));
            }
        ).then(() => dispatch(updateTradeUIState(tradeID, 'disabled', false)));
    };

    thunk.meta = {
        debounce: {
            time: 300,
            key: `PROPOSAL_REQUESTED${tradeID}`,
        },
    };

    return thunk;
};

export const resubscribeAllPriceProposal = () =>
    (dispatch, getState) => {
        const allTrades = getState().trades.keySeq();
        allTrades.forEach(tradeId => dispatch(updatePriceProposalSubscription(tradeId)));
    };

// Handle trade's purchase related operation
export const updatePurchaseInfo = (tradeID, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_PURCHASE_INFO,
    tradeID,
    fieldName,
    fieldValue,
});

export const purchaseByTradeId = (tradeID, trade) =>
    (dispatch, getState) => {
        dispatch(updateTradeUIState(tradeID, 'disabled', true));
        const tradeSelected = trade || getState().trades.get(tradeID).toJS();
        trackEvent('buy-contract', tradeSelected);
        const proposalID = tradeSelected.proposalInfo.proposal.id;
        const price = tradeSelected.proposalInfo.proposal.ask_price;

        LiveData.api.buyContract(proposalID, price)
            .then(
                response => {
                    dispatch(updatePurchaseInfo(tradeID, 'receipt', response.buy));
                    dispatch(updatePurchaseInfo(tradeID, 'mostRecentContractId', response.buy.contract_id));
                    LiveData.api.subscribeToOpenContract(response.buy.contract_id);
                },
                err => dispatch(updatePurchaseInfo(tradeID, 'buy_error', err))
            )
            .then(() => {
                dispatch(updateTradeUIState(tradeID, 'disabled', false));
                dispatch(updatePriceProposalSubscription(tradeID, trade));
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
            await trackEvent('sell-contract', { id, price });
        } catch (error) {
            dispatch(updateOpenContractField({ id, validation_error: error }));
        }
    };
