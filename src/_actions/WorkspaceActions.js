import * as types from '../_constants/ActionTypes';
import { selectAsset } from './TradeActions';

export const changeSelectedAsset = symbol => ({
    type: types.CHANGE_SELECTED_ASSET,
    symbol,
});

export const changeActiveTab = (panel, index) => ({
    type: types.CHANGE_ACTIVE_TAB,
    panel,
    index,
});

export const updateActiveLayout = (tradesCount, layoutN, assetChoices) => ({
    type: types.CHANGE_ACTIVE_LAYOUT,
    tradesCount,
    layoutN,
    assetChoices,
});

export const changeActiveLayout = (tradesCount, layoutN) =>
    (dispatch, getState) => {
        const currentState = getState();
        const additionTradeNeeded = tradesCount - currentState.tradesParams.size;
        if (additionTradeNeeded < 1) {
            return dispatch(updateActiveLayout(tradesCount, layoutN));
        }

        const selectedSymbols = currentState.tradesParams.map(v => v.get('symbol'));
        const firstTradeSymbol = selectedSymbols.get(0);
        const firstTradeMarket = currentState.assets
            .find(v => v.get('symbol') === firstTradeSymbol)
            .get('market');
        const otherAssetInSameMarket = currentState.assets
            .filter(v => {
                const symbolNotSelected = !selectedSymbols.includes(v.get('symbol'));
                const sameMarketWithFirst = v.get('market') === firstTradeMarket;
                return symbolNotSelected && sameMarketWithFirst;
            })
            .map(v => v.get('symbol'));

        if (otherAssetInSameMarket.size < additionTradeNeeded) {
            // get assets not found in otherAssetInSameMarket
            const randomAdditionalSymbols = currentState.assets
                .filter(v => otherAssetInSameMarket.find(a => a !== v.get('symbol')))
                .take(additionTradeNeeded - otherAssetInSameMarket.size);
            const combinedAssetChoices = otherAssetInSameMarket.concat(randomAdditionalSymbols);
            combinedAssetChoices.forEach(asset => dispatch(selectAsset(asset)));
            return dispatch(updateActiveLayout(tradesCount, layoutN, combinedAssetChoices.toJS()));
        }
        otherAssetInSameMarket.forEach(asset => dispatch(selectAsset(asset)));
        return dispatch(updateActiveLayout(tradesCount, layoutN, otherAssetInSameMarket.toJS()));
    };

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
