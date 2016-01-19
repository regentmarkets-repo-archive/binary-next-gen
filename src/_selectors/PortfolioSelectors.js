import { createSelector } from 'reselect';
import { objectToArray } from '../_utils/ArrayUtils';

export const contractsSelector = state => state.contracts;

export const proposalsSelector = state => state.openContractProposals;

export const purchaseTotalSelector = createSelector(
    contractsSelector,
    contracts =>
        contracts
            .map(x => +x.buy_price)
            .reduce((x, y) => x + y, 0),
);

export const indicativeTotalSelector = createSelector(
    proposalsSelector,
    proposals =>
        objectToArray(proposals)
            .map(x => +x.bid_price)
            .reduce((x, y) => x + y, 0),
);

export default createSelector(
    [contractsSelector, proposalsSelector, purchaseTotalSelector, indicativeTotalSelector],
    (contracts, proposals, purchaseTotal, indicativeTotal) => ({
        contracts,
        proposals,
        purchaseTotal,
        indicativeTotal,
    }),
);
