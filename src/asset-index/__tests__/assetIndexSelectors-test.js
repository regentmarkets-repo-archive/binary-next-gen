import { fromJS } from 'immutable';
import assetIndexSelectors from '../assetIndexSelectors';

describe('assetIndexSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        submarket: fromJS({}),
        assetIndex: fromJS([[]]),
        views: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = assetIndexSelectors(state);

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = assetIndexSelectors(state);
        const second = assetIndexSelectors(state);

        expect(first.submarket).toEqual(second.submarket);
        expect(first.assetIndexRows).toEqual(second.assetIndexRows);

        expect(first).toEqual(second);
    });
});
