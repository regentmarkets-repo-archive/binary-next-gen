import { fromJS } from 'immutable';

import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    symbolDetails: 'frxUSDJPY',
    favoriteAssets: ['R_50', 'frxUSDJPY', 'RDBEAR'],
    symbolSelected: 'frxUSDJPY',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKSPACE_VIEW_ASSET_DETAILS: {
            return state;
        }
        case WORKSPACE_ASSET_SELECT: {
            return state.set('symbolSelected', action.symbol);
        }
        case WORKSPACE_FAVOR_ASSET: {
            return state;
        }
        case WORKSPACE_UNFAVOR_ASSET: {
            return state;
        }
        default:
            return state;
    }
};
