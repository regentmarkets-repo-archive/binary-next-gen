import { fromJS } from 'immutable';
import expect from 'expect';
import assetIndexSelectors from '../assetIndexSelectors';

describe('assetIndexSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        submarket: fromJS({}),
        assetIndex: fromJS([[]]),
        workspace: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = assetIndexSelectors(state);

        expect(actual).toExist();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = assetIndexSelectors(state);
        const second = assetIndexSelectors(state);

        expect(first.submarket).toBe(second.submarket);
        expect(first.assetIndexRows).toBe(second.assetIndexRows);

        expect(first).toBe(second);
    });
});
