import { fromJS } from 'immutable';
import { expect } from 'chai';
import portfolioSelectors from '../PortfolioSelectors';

 describe('portfolioSelectors', () => {
     const emptyState = () => ({
         portfolio: fromJS({}),
         boughtContracts: fromJS({}),
     });

     it('should be able to be created', () => {
         const state = emptyState();
         const selectors = portfolioSelectors(state);
         expect(selectors).to.be.ok;
     });

     it('should return same immutable value for the same input state', () => {
         const state = emptyState();
         const first = portfolioSelectors(state);
         const second = portfolioSelectors(state);

         expect(first.contracts).to.equal(second.contracts);
         expect(first.portfolio).to.equal(second.portfolio);
         expect(first.purchaseTotal).to.equal(second.purchaseTotal);
         expect(first.indicativeTotal).to.equal(second.indicativeTotal);

         expect(first).to.equal(second);
     });
 });
