import { Set } from 'immutable';
import expect from 'expect';
import WatchList from '../WatchlistReducer';
import { WATCHLIST_TOGGLE_ASSET, REMOVE_PERSONAL_DATA } from '../../_constants/ActionTypes';

describe('WatchlistReducer',()=>{
    it('should be able to subsribe to watchlist',()=>{
        const action = {
            type: WATCHLIST_TOGGLE_ASSET,
            isSubscribed: true,
            symbol: 'A',
        };
        const beforeState = Set.of({});
        const expectedState = Set.of('A');
        const actualState = WatchList(beforeState,action);
    });

    it('should be able to unsubscribe user from watchlist',()=>{
        const action = {
            type: WATCHLIST_TOGGLE_ASSET,
            isSubscribed: false,
            symbol: 'A',
        };
        const beforeState = Set.of('A');
        const expectedStae = Set.of();
        const actualState = WatchList(beforeState,action);
        expect(expectedStae).toEqual(actualState);
    });

    it('should be able to clear list of subscribers',()=>{
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = Set.of('A');
        const expectedState = Set.of()
        const actualState = WatchList(beforeState,action);
        expect(actualState).toEqual(expectedState);
    });
});