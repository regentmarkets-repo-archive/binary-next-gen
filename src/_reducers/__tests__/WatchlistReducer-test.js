import { Set } from 'immutable';
import { expect } from 'chai';
import watchlistReducer from '../WatchlistReducer';
import { WATCHLIST_TOGGLE_ASSET, REMOVE_PERSONAL_DATA } from '../../_constants/ActionTypes';

describe('watchlistReducer', () => {
    it('should be able to subsribe to watchlist', () => {
        const action = {
            type: WATCHLIST_TOGGLE_ASSET,
            isSubscribed: true,
            symbol: 'A',
        };
        const beforeState = new Set();
        const expectedState = Set.of('A');
        const actualState = watchlistReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to unsubscribe user from watchlist', () => {
        const action = {
            type: WATCHLIST_TOGGLE_ASSET,
            isSubscribed: false,
            symbol: 'A',
        };
        const beforeState = Set.of('A');
        const expectedState = Set.of();
        const actualState = watchlistReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to clear list of subscribers', () => {
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = Set.of('A');
        const expectedState = Set.of();
        const actualState = watchlistReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });
});
