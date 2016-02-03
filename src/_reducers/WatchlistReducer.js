import { Set } from 'immutable';
import { WATCHLIST_FAVOR_ASSET, WATCHLIST_UNFAVOR_ASSET, REMOVE_PERSONAL_DATA } from '../_constants/ActionTypes';

const initialState = Set.of();

export default (state = initialState, action) => {
    switch (action.type) {
        case WATCHLIST_FAVOR_ASSET: {
            return state.add(action.symbol);
        }
        case WATCHLIST_UNFAVOR_ASSET: {
            return state.remove(action.symbol);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
