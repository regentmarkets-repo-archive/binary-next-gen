import { fromJS } from 'immutable';
import portfolioSelectors from '../PortfolioSelectors';

describe('portfolioSelectors', () => {
    const emptyState = () => ({
        portfolio: fromJS({}),
        boughtContracts: fromJS({}),
    });

    it('should be able to be created', () => {
        const state = emptyState();
        const selectors = portfolioSelectors(state);
        expect(selectors).toBeDefined();
    });

    it('should return same immutable value for the same input state', () => {
        const state = emptyState();
        const first = portfolioSelectors(state);
        const second = portfolioSelectors(state);

        expect(first.contracts).toEqual(second.contracts);
        expect(first.portfolio).toEqual(second.portfolio);
        expect(first.purchaseTotal).toEqual(second.purchaseTotal);
        expect(first.indicativeTotal).toEqual(second.indicativeTotal);

        expect(first).toEqual(second);
    });
});
