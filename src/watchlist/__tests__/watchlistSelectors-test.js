import { fromJS, List, Set, Map } from 'immutable';
import { expect } from 'chai';
import watchlistSelectors from '../watchlistSelectors';

describe('watchlistSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        ticks: fromJS({}),
        watchlist: fromJS([]),
        workspace: fromJS({}),
    });

    it('should work with empty state', () => {
        const state = emptyState();

        const actual = watchlistSelectors(state);

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = watchlistSelectors(state);
        const second = watchlistSelectors(state);

        expect(first.watchlistView).to.equal(second.watchlistView);

        expect(first).to.equal(second);
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
            workspace: fromJS({}),
        };

        const watchlistView = watchlistSelectors(state).watchlistView.toJS();

        expect(watchlistView).to.have.lengthOf(1);
        expect(watchlistView[0].symbol).to.equal('R_100');
        expect(watchlistView[0].assetName).to.equal('Random 100 Index');
        expect(watchlistView[0].quote).to.equal(123);
        expect(watchlistView[0].diff).to.equal(23);
    });
});
