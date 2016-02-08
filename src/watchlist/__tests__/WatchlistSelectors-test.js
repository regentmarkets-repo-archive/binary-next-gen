import expect from 'expect';
import watchlistSelectors from '../WatchlistSelectors';

describe('WatchlistSelectors', () => {
    describe('watchlist', () => {
        it('should work with empty state', () => {
            const actual = watchlistSelectors({});
            const expected = {
                assets: undefined,
                ticks: undefined,
                watchlist: undefined,
            };
            expect(actual).toEqual(expected);
        });
    });
});
