import { Set } from 'immutable';
import { WATCHLIST_FAVOR_ASSET, WATCHLIST_UNFAVOR_ASSET } from '../_constants/ActionTypes';

const initialState = Set.of();

export default (state = initialState, action) => {
    switch (action.type) {
        case WATCHLIST_FAVOR_ASSET: {
            return state.add(action.symbol);
        }
        case WATCHLIST_UNFAVOR_ASSET: {
            return state.remove(action.symbol);
        }
        default:
            return state;
    }
};
