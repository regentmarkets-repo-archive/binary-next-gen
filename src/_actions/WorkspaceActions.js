import * as types from '../_constants/ActionTypes';

export function workspaceViewAssetDetails(symbol) {
    return {
        type: types.WORKSPACE_VIEW_ASSET_DETAILS,
        symbol,
    };
}

export function workspaceAssetSelect(symbol) {
    return {
        type: types.WORKSPACE_ASSET_SELECT,
        symbol,
    };
}

export function workspaceFavorAsset(symbol) {
    return {
        type: types.WORKSPACE_FAVOR_ASSET,
        symbol,
    };
}

export function workspaceUnfavorAsset(symbol) {
    return {
        type: types.WORKSPACE_UNFAVOR_ASSET,
        symbol,
    };
}

export function updateTickTradeSubmarket(submarket) {
    return {
        type: types.UPDATE_TRADING_TIMES_SUBMARKET,
        submarket,
    };
}
export function updateTickTradeDate(date) {
    return {
        type: types.UPDATE_TRADING_TIMES_DATE,
        date,
    };
}

export function updateAssetIndexSubmarket(submarket) {
    return {
        type: types.UPDATE_ASSET_INDEX_SUBMARKET,
        submarket,
    };
}
