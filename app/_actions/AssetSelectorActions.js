import * as types from '../_constants/ActionTypes';

export function updateAssetSelectorSearchQuery(assets, query) {
    return {
        type: types.UPDATE_ASSET_SELECTOR_SEARCH_QUERY,
        assets,
        query,
    };
}

export function updateAssetSelectorSubmarket(assets, submarket) {
    return {
        type: types.UPDATE_ASSET_SELECTOR_SUBMARKET,
        assets,
        submarket,
    };
}
