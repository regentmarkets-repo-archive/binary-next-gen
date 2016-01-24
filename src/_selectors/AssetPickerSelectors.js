import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { watchlistSelector } from './WatchlistSelectors';
import { workspaceSelector } from './WorkspaceSelectors';
import { tradesSelector } from './FullTradeSelectors';


export const idSymbolMapSelector = createSelector(
    tradesSelector,
    trades => trades.map(v => v.symbol).toJS()
);

export const assetPickerSelector = createSelector(
    idSymbolMapSelector,
    idSymbolMap => idSymbolMap
);

export default createStructuredSelector({
    assets: assetsSelector,
	assetPicker: assetPickerSelector,
	workspace: workspaceSelector,
	watchlist: watchlistSelector,
	idSymbolMap: idSymbolMapSelector,
});
