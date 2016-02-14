import { fromJS } from 'immutable';
import { expect } from 'chai';
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
        expect(selectors).to.be.ok;
    });

    it('should return same immutable value for the same input state', () => {
        const state = emptyState();
        const first = depositSelectors(state);
        const second = depositSelectors(state);

        expect(first.paymentAgent).to.equal(second.paymentAgent);
        expect(first.currency).to.equal(second.currency);
        expect(first.country).to.equal(second.country);

        expect(first).to.equal(second);
    });
});
