import { fromJS } from 'immutable';
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

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = workspaceSelectors(state);
        const second = workspaceSelectors(state);

        expect(first.workspace).toEqual(second.workspace);
        expect(first.assetIndexSubmarket).toEqual(second.assetIndexSubmarket);
        expect(first.tradingTimesFilter).toEqual(second.tradingTimesFilter);

        expect(first).toEqual(second);
    });
});
