import { fromJS, Set } from 'immutable';
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

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = watchlistSelectors(state);
        const second = watchlistSelectors(state);

        expect(first.watchlistView).toEqual(second.watchlistView);

        expect(first).toEqual(second);
    });

    it('should asemble a view model from input selectors', () => {
        const state = {
            assets: fromJS([
                {
                    symbol: 'R_100',
                    display_name: 'Random 100 Index',
                },
            ]),
            ticks: fromJS({
                R_100: [{ quote: 100 }, { quote: 123 }],
            }),
            watchlist: new Set(['R_100']),
        };

        const watchlistView = watchlistSelectors(state).watchlistView.toJS();

        expect(watchlistView.length).toEqual(1);
        expect(watchlistView[0].symbol).toEqual('R_100');
        expect(watchlistView[0].assetName).toEqual('Random 100 Index');
        expect(watchlistView[0].quote).toEqual(123);
        expect(watchlistView[0].diff).toEqual(23);
    });

    it('should not return assets not currently active', () => {
        const state = {
            assets: fromJS([
                {
                    symbol: 'R_100',
                },
            ]),
            ticks: fromJS({
                R_100: [{ quote: 100 }, { quote: 123 }],
            }),
            watchlist: new Set(['R_100', 'NON EXISTING']),
        };

        const watchlistView = watchlistSelectors(state).watchlistView.toJS();

        expect(watchlistView.length).toEqual(1);
        expect(watchlistView[0].symbol).toEqual('R_100');
    });
});
