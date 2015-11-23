import * as types from '../_constants/ActionTypes';

export const workspaceViewAssetDetails = symbol => ({
    type: types.WORKSPACE_VIEW_ASSET_DETAILS,
    symbol,
});

export const workspaceAssetSelect = symbol => ({
    type: types.WORKSPACE_ASSET_SELECT,
    symbol,
});

export const workspaceFavorAsset = symbol => ({
    type: types.WORKSPACE_FAVOR_ASSET,
    symbol,
});

export const workspaceUnfavorAsset = symbol => ({
    type: types.WORKSPACE_UNFAVOR_ASSET,
    symbol,
});

export const changeActiveTab = (panel, index) => ({
    type: types.CHANGE_ACTIVE_TAB,
    panel,
    index,
});

export const updateTickTradeSubmarket = submarket => ({
    type: types.UPDATE_TRADING_TIMES_SUBMARKET,
    submarket,
});

export const updateTickTradeDate = date => ({
    type: types.UPDATE_TRADING_TIMES_DATE,
    date,
});

export const updateAssetIndexSubmarket = submarket => ({
    type: types.UPDATE_ASSET_INDEX_SUBMARKET,
    submarket,
});
