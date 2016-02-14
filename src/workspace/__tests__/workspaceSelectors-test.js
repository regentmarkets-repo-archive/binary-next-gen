import { fromJS } from 'immutable';
import { expect } from 'chai';
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

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = workspaceSelectors(state);
        const second = workspaceSelectors(state);

        expect(first.workspace).to.equal(second.workspace);
        expect(first.assetIndexSubmarket).to.equal(second.assetIndexSubmarket);
        expect(first.tradingTimesFilter).to.equal(second.tradingTimesFilter);

        expect(first).to.equal(second);
    });
});
