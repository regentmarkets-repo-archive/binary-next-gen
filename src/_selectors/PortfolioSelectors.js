import { createSelector } from 'reselect';
import { objectToArray } from '../_utils/ArrayUtils';

export const contractsSelector = state => state.contracts;

export const proposalsSelector = state => state.openContractProposals;

export const purchaseTotalSelector = createSelector(
    contractsSelector,
    contracts =>
        contracts.reduce((x, y) => x + +y.buy_price, 0),
);

export const indicativeTotalSelector = createSelector(
    proposalsSelector,
    proposals =>
        objectToArray(proposals).reduce((x, y) => x + +y.bid_price, 0),
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
