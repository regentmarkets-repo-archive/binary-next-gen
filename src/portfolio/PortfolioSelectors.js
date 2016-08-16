import { createSelector, createStructuredSelector } from 'reselect';
import { boughtContractsSelector } from '../_store/directSelectors';

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
            .sort((a, b) => a.get('contract_id') > b.get('contract_id') ? -1 : 1)
            .map(c => c
                .filter((v, k) =>
                    k === 'contract_id' ||
                        k === 'payout' ||
                        k === 'transaction_ids' ||
                        k === 'currency' ||
                        k === 'buy_price' ||
                        k === 'bid_price'
                )
            )
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

export const payoutTotalSelector = createSelector(
    activeOpenContractSelector,
    contracts =>
        contracts
            .map(x => +x.get('payout'))
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    contracts: activeOpenContractSelector,
    purchaseTotal: purchaseTotalSelector,
    indicativeTotal: indicativeTotalSelector,
    payoutTotal: payoutTotalSelector,
});
