import { fromJS } from 'immutable';
import expect from 'expect';
import workspaceSelectors from '../workspaceSelectors';

describe('workspaceSelectors', () => {
    const emptyState = () => ({
        workspace: fromJS([]),
        assetIndexSubmarket: fromJS({}),
        tradingTimesFilter: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = workspaceSelectors(state);

        expect(actual).toExist();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = workspaceSelectors(state);
        const second = workspaceSelectors(state);

        expect(first.workspace).toBe(second.workspace);
        expect(first.assetIndexSubmarket).toBe(second.assetIndexSubmarket);
        expect(first.tradingTimesFilter).toBe(second.tradingTimesFilter);

        expect(first).toBe(second);
    });
});
