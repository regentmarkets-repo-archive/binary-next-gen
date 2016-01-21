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

export const discardPurchaseReceipt = () => ({
    type: types.DISCARD_PURCHASE_RECEIPT,
});

export const subscribeToPriceProposal = (contract) => {
    return () => {
        LiveData.api.unsubscribeFromAllProposals();
        LiveData.api.subscribeToPriceForContractProposal({
            amount: contract.get('amount').toString(),
            barrier: contract.get('barrier'),
            basis: contract.get('basis'),
            contract_type: contract.get('tradeType'),
            currency: contract.get('currency'),
            duration: contract.get('duration').toString(),
            duration_unit: contract.get('duration_unit') || 't',
            symbol: contract.get('assetSymbol'),
        });
    };
};

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

export const updateQuickTradePriceProposalSubscription = (symbol, trade) => {
    return (dispatch, getState) => {
        const quickTrade = getState().quickTrade;
        const opts = quickTrade.getIn([symbol, trade, 'params']);
        const proposal = getState().proposals.getIn([symbol, trade]);
        if (proposal) {
            const proposalID = proposal.id;
            LiveData.api.unsubscribeByID(proposalID);
        }
        LiveData.api.subscribeToPriceForContractProposal(opts.toJS());
    };
};

export const setQuickTradeField = (symbol, tradeType, field, value) => ({
    type: types.SET_QUICK_TRADE_FIELD,
    symbol,
    tradeType,
    field,
    value,
});

export const initTrade = id => ({
    type: types.INIT_TRADE,
    id,
});

export const destroyTrade = id => ({
    type: types.DESTROY_TRADE,
    id,
});

export const destroyAllTrade = () => ({
    type: types.DESTROY_ALL_TRADE,
});

export const updateTradeParams = (id, fieldName, fieldValue) => ({
    type: types.UPDATE_TRADE_PARAMS,
    id,
    fieldName,
    fieldValue,
});

export const updatePriceProposalSubscription = (tradeID, trade) => {
    return (dispatch, getState) => {
        const tradeObj = trade ? trade : getState().trades.get(tradeID).toJS();
        const currency = getState().account.get('currency');
        const {
            amount,
            basis,
            type,
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
            currency,
            duration_unit: durationUnit,
            symbol,
            barrier: b1,
            barrier2: b2,
            amount_per_point: amountPerPoint,
            stop_type: stopType,
            stop_profit: stopProfit,
            stop_loss: stopLoss,
        }).then(response => {
            dispatch(updateTradeParams(tradeID, 'proposalError', undefined));
            dispatch(updateTradeParams(tradeID, 'proposal', response.proposal));
        }).catch(err => {
            dispatch(updateTradeParams(tradeID, 'proposalError', err));
            dispatch(updateTradeParams(tradeID, 'proposal', undefined));
        });
    };
};

export const purchaseByTradeID = (tradeID, trade) => {
    return (dispatch, getState) => {
        const tradeSelected = trade ? trade : getState().trades.get(tradeID).toJS();
        trackEvent('buy-contract', tradeSelected);
        const proposalID = tradeSelected.proposal.id;
        const price = tradeSelected.proposal.ask_price;
        dispatch(updateTradeParams(tradeID, 'buying', true));
        LiveData.api.buyContract(proposalID, price)
            .then(response => dispatch(updateTradeParams(tradeID, 'receipt', response.buy)))
            .catch(err => dispatch(updateTradeParams(tradeID, 'buy_error', err)))
            .then(() => dispatch(updateTradeParams(tradeID, 'buying', false)));
    };
};
