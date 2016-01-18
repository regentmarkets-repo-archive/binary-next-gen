import { createSelector } from 'reselect';

const contractsSelector = state => state.contracts;
const proposalsSelector = state => state.proposals;

export const purchaseTotal = createSelector(
    contractsSelector,
    contracts => {
		console.log(contracts);
        return contracts.reduce((x, y) => x + +y.buy_price, 0);
	}
);

export const indicativeTotal = createSelector(
    proposalsSelector,
    proposals =>
        proposals.values().reduce((x, y) => x + +y, 0),
);
