import { createSelector, createStructuredSelector } from 'reselect';

//export const contractsSelector = state => state.contracts;
//
//export const proposalsSelector = state => state.openContractProposals;
//
//
//export const purchaseTotalSelector = createSelector(
//    contractsSelector,
//    contracts =>
//        contracts
//            .map(x => +x.buy_price)
//            .reduce((x, y) => x + y, 0)
//);
//
const portfolioSelector =
    state => state.portfolio.toJS();

const openContractsSelector =
    state => state.openContracts.valueSeq().toJS();

export const indicativeTotalSelector = createSelector(
    openContractsSelector,
    contracts =>
        contracts
            .map(x => +x.bid_price)
            .reduce((x, y) => x + y, 0)
);

export const purchaseTotalSelector = createSelector(
    openContractsSelector,
    contracts =>
        contracts
            .map(x => +x.buy_price)
            .reduce((x, y) => x + y, 0)
);

export default createStructuredSelector({
    contracts: openContractsSelector,
    portfolio: portfolioSelector,
    purchaseTotal: purchaseTotalSelector,
    indicativeTotal: indicativeTotalSelector,
});
