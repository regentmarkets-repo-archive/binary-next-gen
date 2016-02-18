import { fromJS } from 'immutable';
import { expect } from 'chai';
import tradesSelectors from '../tradesSelectors';

describe('tradesSelectors', () => {
    const emptyState = () => ({
        trades: fromJS([]),
        assets: fromJS([]),
        account: fromJS({}),
    });

    it('can be instantiated', () => {
        const state = emptyState();
        const actual = tradesSelectors(state);

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = tradesSelectors(state);
        const second = tradesSelectors(state);

        expect(first.trades).to.equal(second.trades);
        expect(first.assets).to.equal(second.assets);
        expect(first.currency).to.equal(second.currency);

        expect(first).to.equal(second);
    });
});
