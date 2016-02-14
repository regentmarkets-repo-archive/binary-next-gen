import { fromJS } from 'immutable';
import { expect } from 'chai';
import sidebarSelectors from '../sidebarSelectors';

describe('sidebarSelectors', () => {
    const emptyState = () => ({
        account: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = sidebarSelectors(state);

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = sidebarSelectors(state);
        const second = sidebarSelectors(state);

        expect(first.account).to.equal(second.account);

        expect(first).to.equal(second);
    });
});
