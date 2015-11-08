import * as types from '../_constants/ActionTypes';

export const updateAssetSelectorSearchQuery = (assets, query) => ({
    type: types.UPDATE_ASSET_SELECTOR_SEARCH_QUERY,
    assets,
    query,
});

export const updateAssetSelectorMarkets = (assets, markets) => ({
    type: types.UPDATE_ASSET_SELECTOR_MARKETS,
    assets,
    markets,
});

export const updateAssetSelectorSubmarket = (assets, submarket) => ({
    type: types.UPDATE_ASSET_SELECTOR_SUBMARKET,
    assets,
    submarket,
});
