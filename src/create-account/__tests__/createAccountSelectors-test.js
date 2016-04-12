import { fromJS } from 'immutable';
import { expect } from 'chai';
import createAccountSelectors from '../createAccountSelectors';

 describe('createAccountSelector', () => {
     const emptyState = () => ({
         createAccoount: fromJS({}),
     });

     it('should be able to be created', () => {
         const state = emptyState();
         const selectors = createAccountSelectors(state);
         expect(selectors).to.be.ok;
     });

     it('should return same immutable value for the same input state', () => {
         const state = emptyState();
         const first = createAccountSelectors(state);
         const second = createAccountSelectors(state);

         expect(first.settings).to.equal(second.settings);
         expect(first.loginid).to.equal(second.loginid);
         expect(first.boot).to.equal(second.boot);

         expect(first).to.equal(second);
     });
 });
