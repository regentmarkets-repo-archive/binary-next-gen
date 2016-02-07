import { Set } from 'immutable';
import { WATCHLIST_TOGGLE_ASSET, REMOVE_PERSONAL_DATA } from '../_constants/ActionTypes';

const initialState = Set.of();

export default (state = initialState, action) => {
    switch (action.type) {
        case WATCHLIST_TOGGLE_ASSET: {
            return action.isSubscribed ?
                state.add(action.symbol) :
                state.remove(action.symbol);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
