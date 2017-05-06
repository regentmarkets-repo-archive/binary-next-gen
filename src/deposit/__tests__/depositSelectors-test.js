import { fromJS } from 'immutable';
import depositSelectors from '../depositSelectors';

describe('depositSelectors', () => {
    const emptyState = () => ({
        paymentAgent: fromJS({}),
        account: fromJS({}),
        settings: fromJS({}),
    });

    it('should be able to be created', () => {
        const state = emptyState();
        const selectors = depositSelectors(state);
        expect(selectors).toBeDefined();
    });

    it('should return same immutable value for the same input state', () => {
        const state = emptyState();
        const first = depositSelectors(state);
        const second = depositSelectors(state);

        expect(first.paymentAgent).toEqual(second.paymentAgent);
        expect(first.currency).toEqual(second.currency);
        expect(first.country).toEqual(second.country);

        expect(first).toEqual(second);
    });
});
