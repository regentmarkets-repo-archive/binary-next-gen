import * as types from '../_constants/ActionTypes';

export const updateAssetPickerSearchQuery = query => ({
    type: types.UPDATE_ASSET_PICKER_SEARCH_QUERY,
    query,
});

export const updateAssetPickerMarkets = markets => ({
    type: types.UPDATE_ASSET_PICKER_MARKETS,
    markets,
});

export const updateAssetPickerSubmarket = submarket => ({
    type: types.UPDATE_ASSET_PICKER_SUBMARKET,
    submarket,
});

export const updateAssetPickerFilter = marketOrSubmarket => ({
    type: types.UPDATE_ASSET_PICKER_FILTER,
    filter: marketOrSubmarket,
});
