import * as types from '../_constants/ActionTypes';

export const updateAssetPickerSearchQuery = (assets, query) => ({
    type: types.UPDATE_ASSET_PICKER_SEARCH_QUERY,
    assets,
    query,
});

export const updateAssetPickerMarkets = (assets, markets) => ({
    type: types.UPDATE_ASSET_PICKER_MARKETS,
    assets,
    markets,
});

export const updateAssetPickerSubmarket = (assets, submarket) => ({
    type: types.UPDATE_ASSET_PICKER_SUBMARKET,
    assets,
    submarket,
});
