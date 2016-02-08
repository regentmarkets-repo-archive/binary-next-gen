import { fromJS } from 'immutable';
import expect from 'expect';
import settingsSelectors from '../settingsSelectors';

 describe('settingsSelectors', () => {
     const emptyState = () => ({
         settings: fromJS({}),
         account: fromJS({}),
         appConfig: fromJS({}),
     });

     it('should be able to be created', () => {
         const state = emptyState();
         const selectors = settingsSelectors(state);
         expect(selectors).toExist();
     });

     it('should return same immutable value for the same input state', () => {
         const state = emptyState();
         const first = settingsSelectors(state);
         const second = settingsSelectors(state);

         expect(first.settings).toBe(second.settings);
         expect(first.loginid).toBe(second.loginid);
         expect(first.appConfig).toBe(second.appConfig);

         expect(first).toBe(second);
     });
 });
