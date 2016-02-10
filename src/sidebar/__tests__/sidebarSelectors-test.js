import { fromJS } from 'immutable';
import expect from 'expect';
import sidebarSelectors from '../sidebarSelectors';

describe('sidebarSelectors', () => {
    const emptyState = () => ({
        account: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = sidebarSelectors(state);

        expect(actual).toExist();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = sidebarSelectors(state);
        const second = sidebarSelectors(state);

        expect(first.account).toBe(second.account);

        expect(first).toBe(second);
    });
});
