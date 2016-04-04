import { boughtContractsSelector, portfolioSelector, ticksSelector } from '../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';

const activeOpenContractSelector = createSelector(
    boughtContractsSelector,
    boughtContracts =>
        /**
         * check 'contract_id' is a synchronization, as contracts is combination of 2 data point,
         * transaction_id is from transactions stream, the rest from open contract stream
         * this check ensure open contract response is received before rendering,
         * but does not ensure `transaction_id` is sync
         */
        boughtContracts
            .filter(c => !c.get('sell_price') && c.get('contract_id'))
);

export const indicativeTotalSelector = createSelector(
    activeOpenContractSelector,
    contracts =>
        contracts
            .map(x => +x.get('bid_price'))
            .reduce((x, y) => x + y, 0)
);

export const purchaseTotalSelector = createSelector(
    activeOpenContractSelector,
    contracts =>
        contracts
            .map(x => +x.get('buy_price'))
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    ticks: ticksSelector,
    contracts: activeOpenContractSelector,
    portfolio: portfolioSelector,
    purchaseTotal: purchaseTotalSelector,
    indicativeTotal: indicativeTotalSelector,
});
