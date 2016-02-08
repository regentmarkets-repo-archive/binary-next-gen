import { fromJS } from 'immutable';
import expect from 'expect';
import portfolioSelectors from '../PortfolioSelectors';

 describe('portfolioSelectors', () => {
     const emptyState = () => ({
         portfolio: fromJS({}),
         openContracts: fromJS({}),
     });

     it('should be able to be created', () => {
         const state = emptyState();
         const selectors = portfolioSelectors(state);
         expect(selectors).toExist();
     });

     it('should return same immutable value for the same input state', () => {
         const state = emptyState();
         const first = portfolioSelectors(state);
         const second = portfolioSelectors(state);

         expect(first.contracts).toBe(second.contracts);
         expect(first.portfolio).toBe(second.portfolio);
         expect(first.purchaseTotal).toBe(second.purchaseTotal);
         expect(first.indicativeTotal).toBe(second.indicativeTotal);

         expect(first).toBe(second);
     });
 });
