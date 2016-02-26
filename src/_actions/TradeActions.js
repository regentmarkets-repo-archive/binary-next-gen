import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { updateSoldContract } from './PortfolioActions';
import { trackEvent } from '../_utils/Analytics';
import { numberToSignedString } from '../_utils/StringUtils';

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

export const sellContract = (id, price) => {
    trackEvent('sell-contract', { id, price });
    return dispatch => {
        LiveData.api.sellContract(id, price).then(res => {
            dispatch(updateSoldContract(res.sell.contract_id, res.sell.sold_for, res.sell.transaction_id));
        });
    };
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
        const opts = quickTrade.getIn([symbol, trade, 'params']);
        const proposal = getState().proposals.getIn([symbol, trade]);
        if (proposal) {
            const proposalID = proposal.id;
            LiveData.api.unsubscribeByID(proposalID);
        }
        LiveData.api.subscribeToPriceForContractProposal(opts.toJS());
    };

export const setQuickTradeField = (symbol, tradeType, field, value) => ({
    type: types.SET_QUICK_TRADE_FIELD,
    symbol,
    tradeType,
    field,
    value,
});

export const createTrade = (symbol) => ({
    type: types.CREATE_TRADE,
    symbol,
});

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

export const updateTradeParams = (id, fieldName, fieldValue) => {
    trackEvent('update-trade-paremeters', { fieldName, fieldValue });
    return {
        type: types.UPDATE_TRADE_PARAMS,
        id,
        fieldName,
        fieldValue,
    };
};

export const updatePriceProposalSubscription = (tradeID, trade) =>
    (dispatch, getState) => {
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
        );
    };

export const purchaseByTradeId = (tradeID, trade) =>
    (dispatch, getState) => {
        const tradeSelected = trade || getState().trades.get(tradeID).toJS();
        trackEvent('buy-contract', tradeSelected);
        const proposalID = tradeSelected.proposal.id;
        const price = tradeSelected.proposal.ask_price;
        dispatch(updateTradeParams(tradeID, 'buying', true));
        LiveData.api.buyContract(proposalID, price)
            .then(
                response => dispatch(updateTradeParams(tradeID, 'receipt', response.buy)),
                err => dispatch(updateTradeParams(tradeID, 'buy_error', err))
            )
            .then(() => dispatch(updateTradeParams(tradeID, 'buying', false)));
    };
