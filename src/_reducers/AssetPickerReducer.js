import { fromJS } from 'immutable';
import {
    UPDATE_ASSET_PICKER_SEARCH_QUERY,
    UPDATE_ASSET_PICKER_MARKETS,
    UPDATE_ASSET_PICKER_SUBMARKET,
    UPDATE_ASSET_PICKER_FILTER,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    query: '',
    filter: 'all',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ASSET_PICKER_SEARCH_QUERY: {
            return state
                .set('query', action.query);
        }
        case UPDATE_ASSET_PICKER_SUBMARKET: {
            return state
                .set('submarket', action.submarket);
        }
        case UPDATE_ASSET_PICKER_MARKETS: {
            return state
                .set('markets', fromJS(action.markets));
        }
        case UPDATE_ASSET_PICKER_FILTER: {
            return state.set('filter', action.filter);
        }
        default:
            return state;
    }
};
