import {
    WORKSPACE_VIEW_ASSET_DETAILS,
    WORKSPACE_ASSET_SELECT,
    WORKSPACE_FAVOR_ASSET,
    WORKSPACE_UNFAVOR_ASSET,
} from '../_constants/ActionTypes';

const initialState = new Map({
    symbolDetails: 'frxUSDJPY',
    favoriteAssets: ['R_50', 'frxUSDJPY', 'RDBEAR'],
    selectedAsset: 'frxUSDJPY',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKSPACE_VIEW_ASSET_DETAILS: {
            return state;
        }
        case WORKSPACE_ASSET_SELECT: {
            return state;
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
