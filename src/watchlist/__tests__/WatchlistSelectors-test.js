import { fromJS } from 'immutable';
import expect from 'expect';
import watchlistSelectors from '../watchlistSelectors';

describe('watchlistSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        ticks: fromJS({}),
        watchlist: fromJS([]),
    });

    it('should work with empty state', () => {
        const state = emptyState();

        const actual = watchlistSelectors(state);

        expect(actual).toExist();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = watchlistSelectors(state);
        const second = watchlistSelectors(state);

        expect(first.watchlistView).toBe(second.watchlistView);

        expect(first).toBe(second);
    });
});
