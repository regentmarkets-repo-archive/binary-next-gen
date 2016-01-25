import { createSelector } from 'reselect';

export const idSymbolMapSelector = state => {
    const allTrades = state.trades;
    const idSymbolMap = allTrades.map(v => v.symbol);
    return idSymbolMap.toJS();
};

export const assetPickerSelector = createSelector(idSymbolMapSelector, idSymbolMap => idSymbolMap);
