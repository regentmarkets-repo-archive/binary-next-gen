import { createSelector, createStructuredSelector } from 'reselect';

const portfolioSelector =
    state => state.portfolio;

const openContractsSelector =
    state => state.openContracts.valueSeq();

export const indicativeTotalSelector = createSelector(
    openContractsSelector,
    contracts =>
        contracts
            .map(x => +x.get('bid_price'))
            .reduce((x, y) => x + y, 0)
);

export const purchaseTotalSelector = createSelector(
    openContractsSelector,
    contracts =>
        contracts
            .map(x => +x.get('buy_price'))
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    contracts: openContractsSelector,
    portfolio: portfolioSelector,
    purchaseTotal: purchaseTotalSelector,
    indicativeTotal: indicativeTotalSelector,
});
