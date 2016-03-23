import { openContractsSelector, portfolioSelector, ticksSelector } from '../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';

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

const activeOpenContractSelector = createSelector(
    openContractsSelector,
    openContracts =>
        openContracts.filter(c => !c.get('sell_price'))
);

export default createStructuredSelector({
    ticks: ticksSelector,
    contracts: activeOpenContractSelector,
    portfolio: portfolioSelector,
    purchaseTotal: purchaseTotalSelector,
    indicativeTotal: indicativeTotalSelector,
});
