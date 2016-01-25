import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { watchlistSelector } from './WatchlistSelectors';
import { workspaceSelector } from './WorkspaceSelectors';
// import { tradesSelector } from './FullTradeSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';

//
export const idSymbolMapSelector = createSelector(
     assetsSelector,
     assets => toPlainJS(assets.map(v => v.symbol)),
 );

// export const assetPickerSelector = createSelector(
//     idSymbolMapSelector,
//     idSymbolMap => idSymbolMap,
// );

export const assetPickerSelector = state => toPlainJS(state.assetPicker);

export default createStructuredSelector({
    assets: assetsSelector,
	assetPicker: assetPickerSelector,
	workspace: workspaceSelector,
	watchlist: watchlistSelector,
	idSymbolMap: idSymbolMapSelector,
});

// @connect(state => ({
// 	assets: state.assets,
// 	assetPicker: state.assetPicker,
// 	workspace: state.workspace,
// 	watchlist: state.watchlist,
// 	idSymbolMap: idSymbolMapSelector(state),
// }))
