import * as types from '../_constants/ActionTypes';

export const changeSelectedAsset = symbol => ({
    type: types.CHANGE_SELECTED_ASSET,
    symbol,
});

export const changeActiveTab = (panel, index) => ({
    type: types.CHANGE_ACTIVE_TAB,
    panel,
    index,
});

export const changeActiveLayout = (tradesCount, layoutN) => ({
    type: types.CHANGE_ACTIVE_LAYOUT,
    tradesCount,
    layoutN,
});

export const changeActiveWorkspaceTab = (panel, index) => ({
    type: types.CHANGE_ACTIVE_WORKSPACE_TAB,
    panel,
    index,
});

export const changeActiveTrade = (activeTradeIndex) => ({
    type: types.CHANGE_ACTIVE_TRADE,
    activeTradeIndex,
});

export const changeWorkspacePanelSize = (panel, size) => ({
    type: types.CHANGE_WORKSPACE_PANEL_SIZE,
    panel,
    size,
});

export const changeTradeMode = tradeMode => ({
    type: types.CHANGE_TRADE_MODE,
    tradeMode,
});

export const toggleTradeMode = () => ({
    type: types.TOGGLE_TRADE_MODE,
});

export const togglePanel = panel => ({
    type: types.TOGGLE_PANEL,
    panel,
});
