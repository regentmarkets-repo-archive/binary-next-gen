import { fromJS } from 'immutable';
import expect from 'expect';
import createAccountSelectors from '../createAccountSelectors';

 describe('createAccountSelector', () => {
     const emptyState = () => ({
         createAccoount: fromJS({}),
     });

     it('should be able to be created', () => {
         const state = emptyState();
         const selectors = createAccountSelectors(state);
         expect(selectors).toExist();
     });

     it('should return same immutable value for the same input state', () => {
         const state = emptyState();
         const first = createAccountSelectors(state);
         const second = createAccountSelectors(state);

         expect(first.settings).toBe(second.settings);
         expect(first.loginid).toBe(second.loginid);
         expect(first.appConfig).toBe(second.appConfig);

         expect(first).toBe(second);
     });
 });
