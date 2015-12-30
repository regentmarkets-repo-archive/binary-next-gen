import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { updateSoldContract } from './PortfolioActions';
import { trackEvent } from '../_utils/Analytics';

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

export const getPriceProposal = (contract) => {
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
