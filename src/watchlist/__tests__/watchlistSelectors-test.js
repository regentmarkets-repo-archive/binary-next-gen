import { fromJS, List, Set, Map } from 'immutable';
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

    it('should asemble a view model from input selectors', () => {
        const state = {
            assets: fromJS([{
                symbol: 'R_100',
                display_name: 'Random 100 Index',
            }]),
            ticks: new Map({
                R_100: new List([{ quote: 100 }, { quote: 123 }]),
            }),
            watchlist: new Set([
                'R_100',
            ]),
        };

        const watchlistView = watchlistSelectors(state).watchlistView.toJS();

        expect(watchlistView.length).toBe(1);
        expect(watchlistView[0].symbol).toBe('R_100');
        expect(watchlistView[0].assetName).toBe('Random 100 Index');
        expect(watchlistView[0].quote).toBe(123);
        expect(watchlistView[0].diff).toBe(23);
    });
});
