import { fromJS } from 'immutable';
import expect from 'expect';
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
        expect(selectors).toExist();
    });

    it('should return same immutable value for the same input state', () => {
        const state = emptyState();
        const first = depositSelectors(state);
        const second = depositSelectors(state);

        expect(first.paymentAgent).toBe(second.paymentAgent);
        expect(first.currency).toBe(second.currency);
        expect(first.country).toBe(second.country);

        expect(first).toBe(second);
    });
});
