import { fromJS } from 'immutable';
import { expect } from 'chai';
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

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = assetIndexSelectors(state);
        const second = assetIndexSelectors(state);

        expect(first.submarket).to.equal(second.submarket);
        expect(first.assetIndexRows).to.equal(second.assetIndexRows);

        expect(first).to.equal(second);
    });
});
