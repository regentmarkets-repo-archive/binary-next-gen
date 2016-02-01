import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { watchlistSelector } from './WatchlistSelectors';
import { workspaceSelector } from './WorkspaceSelectors';
import { maxTradeIdSelector } from './FullTradeSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';

export const idSymbolMapSelector = createSelector(
     assetsSelector,
     assets => toPlainJS(assets.map(v => v.symbol))
);

export const similarStr = (str1 = '', str2 = '') =>
    str1.toLowerCase().includes(str2.toLowerCase());

const matcher = (asset, query, submarket) =>
    (submarket === '' ||
        submarket === asset.submarket) &&
    (query.trim() === '' ||
        similarStr(asset.symbol, query) ||
        similarStr(asset.display_name, query) ||
        similarStr(asset.market_display_name, query) ||
        similarStr(asset.submarket_display_name, query));

const doFilter = (availableAssets, query, markets, submarket) =>
    availableAssets
        .filter(asset => matcher(asset, query, submarket))
        .sort((x1, x2) => x1.display_name.localeCompare(x2.display_name));

// const hasTick = assets =>
//     assets
//         .filter(asset => asset[2].includes('t'))
//         .length > 0;

// const tickTradeFilter = assetIndex =>
//     assetIndex
//         .filter(asset => hasTick(asset[2]))
//         .map(asset => asset[0]);

// const showOnlyTickTradable = !!~window.location.search.indexOf('tick');
// const showOnlyTickTradable = type === 'tick';
// const searchableAssets = assets.filter(x =>
//     !showOnlyTickTradable ||
//     x.market_display_name === 'Forex' ||
//     x.market_display_name === 'Randoms'
// );

const availableAssetsSelector = assetsSelector;

export const marketsSelector = () => [];

export const assetFilterSelector = state => toPlainJS(state.assetPicker);

export const shownAssetsSelector = createSelector(
    [availableAssetsSelector, assetFilterSelector], // todo: availableAssetsSelector
    (availableAssets, filter) =>
        doFilter(availableAssets, filter.query, filter.market, filter.submarket)
);

export default createStructuredSelector({
    availableAssets: availableAssetsSelector,
    shownAssets: shownAssetsSelector,
	filter: assetFilterSelector,
    markets: marketsSelector,
    maxTradeId: maxTradeIdSelector,
	workspace: workspaceSelector,
	watchlist: watchlistSelector,
	idSymbolMap: idSymbolMapSelector,
});
