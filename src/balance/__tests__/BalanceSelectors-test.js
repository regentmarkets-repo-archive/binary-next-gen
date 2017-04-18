import { fromJS } from 'immutable';
import balanceSelectors from '../balanceSelectors';

describe('balanceSelectors', () => {
    const emptyState = () => ({ account: fromJS({}) });

    it('should be able to be created', () => {
        const state = emptyState();
        const selector = balanceSelectors(state);
        expect(selector).toBeDefined();
    });
});
