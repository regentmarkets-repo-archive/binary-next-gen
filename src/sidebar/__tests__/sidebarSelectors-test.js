import { fromJS } from 'immutable';
import sidebarSelectors from '../sidebarSelectors';

describe('sidebarSelectors', () => {
    const emptyState = () => ({
        account: fromJS({}),
        boot: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = sidebarSelectors(state);

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = sidebarSelectors(state);
        const second = sidebarSelectors(state);

        expect(first.account).toEqual(second.account);

        expect(first).toEqual(second);
    });
});
