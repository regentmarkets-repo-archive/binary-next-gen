import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { changeActiveTrade } from './WorkspaceActions';
import { trackEvent } from 'binary-utils/lib/Analytics';
import numberToSignedString from 'binary-utils/lib/numberToSignedString';
import { updateOpenContractField } from './PortfolioActions';
import { getTicksBySymbol } from './TickActions';
import { getTradingOptions } from './TradingOptionsActions';

export const serverDataProposal = serverResponse => ({
    type: types.SERVER_DATA_PROPOSAL,
    serverResponse,
});

export const updateTickTradeParameters = parameters => {
    trackEvent('update-trade-paremeters', parameters);
    return {
        type: types.UPDATE_TICK_TRADE_PARAMETERS,
        parameters,
    };
};

export const serverDataBuy = serverResponse => ({
    type: types.SERVER_DATA_BUY,
    serverResponse,
});

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

export const updateQuickTradeParams = (symbol, tradeType, params) => {
    trackEvent('update-quick-trade-params', { symbol, params });
    return {
        type: types.UPDATE_QUICK_TRADE_PARAMS,
        symbol,
        tradeType,
        params,
    };
};

export const updateQuickTradePriceProposalSubscription = (symbol, trade) =>
    (dispatch, getState) => {
        const quickTrade = getState().quickTrade;
        const paramns = quickTrade.getIn([symbol, trade, 'params']);
        const proposal = getState().proposals.getIn([symbol, trade]);
        if (proposal) {
            const proposalID = proposal.id;
            LiveData.api.unsubscribeByID(proposalID);
        }
        LiveData.api.subscribeToPriceForContractProposal(paramns.toJS());
    };

export const setQuickTradeField = (symbol, tradeType, field, value) => ({
    type: types.SET_QUICK_TRADE_FIELD,
    symbol,
    tradeType,
    field,
    value,
});

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

export const updatePriceProposalSubscription = (tradeID, trade) => {
    const thunk = (dispatch, getState) => {
        dispatch(updateTradeParams(tradeID, 'disabled', true));
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
        } = tradeObj;

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
                dispatch(updateTradeParams(tradeID, 'proposalError', undefined));
                dispatch(updateTradeParams(tradeID, 'proposal', response.proposal));
            },
            err => {
                dispatch(updateTradeParams(tradeID, 'proposalError', err));
                dispatch(updateTradeParams(tradeID, 'proposal', undefined));
            }
        ).then(() => dispatch(updateTradeParams(tradeID, 'disabled', false)));
    };

    thunk.meta = {
        debounce: {
            time: 300,
            key: `PROPOSAL_REQUESTED${tradeID}`,
        },
    };

    return thunk;
};

// Kinda hack to solve problem when user change language
export const resubscribeAllPriceProposal = () =>
    (dispatch, getState) => {
        const allTrades = getState().trades.keySeq();
        allTrades.forEach(tradeId => dispatch(updatePriceProposalSubscription(tradeId)));
    };

export const purchaseByTradeId = (tradeID, trade) =>
    (dispatch, getState) => {
        dispatch(updateTradeParams(tradeID, 'disabled', true));
        const tradeSelected = trade || getState().trades.get(tradeID).toJS();
        trackEvent('buy-contract', tradeSelected);
        const proposalID = tradeSelected.proposal.id;
        const price = tradeSelected.proposal.ask_price;

        LiveData.api.buyContract(proposalID, price)
            .then(
                response => {
                    dispatch(updateTradeParams(tradeID, 'receipt', response.buy));
                    dispatch(updateTradeParams(tradeID, 'mostRecentContractId', response.buy.contract_id));
                    LiveData.api.subscribeToOpenContract(response.buy.contract_id);
                },
                err => dispatch(updateTradeParams(tradeID, 'buy_error', err))
            )
            .then(() => {
                dispatch(updateTradeParams(tradeID, 'disabled', false));
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
