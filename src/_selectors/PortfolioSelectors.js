import { createSelector } from 'reselect';

export const contractsSelector = state => {
    return state.contracts || (state.portfolio && state.portfolio.get('contracts')) || [];
};

export const proposalsSelector = state => {
    return state.proposals || (state.portfolio && state.portfolio.get('proposals')) || {};
};

export const purchaseTotalSelector = createSelector(
    contractsSelector,
    contracts =>
        contracts.reduce((x, y) => x + +y.buy_price, 0),
);

export const indicativeTotalSelector = createSelector(
    proposalsSelector,
    () => 0, // proposals => proposals.values().reduce((x, y) => x + +y, 0),
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
