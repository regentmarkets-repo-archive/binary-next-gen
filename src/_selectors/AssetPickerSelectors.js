import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { watchlistSelector } from './WatchlistSelectors';
import { workspaceSelector } from './WorkspaceSelectors';
import { maxTradeIdSelector } from './FullTradeSelectors';

export const idSymbolMapSelector = createSelector(
     assetsSelector,
     assets => assets.map(v => v.get('symbol'))
);

export const similarStr = (str1 = '', str2 = '') =>
    str1.toLowerCase().includes(str2.toLowerCase());

const matcher = (asset, query, submarket) =>
    (submarket === '' ||
        submarket === asset.get('submarket')) &&
    (query.trim() === '' ||
        similarStr(asset.get('symbol'), query) ||
        similarStr(asset.get('display_name', query) ||
        similarStr(asset.get('market_display_name'), query) ||
        similarStr(asset.get('submarket_display_name'), query)
    ));

const doFilter = (availableAssets, query, markets, submarket) =>
    availableAssets
        .filter(asset => matcher(asset, query, submarket))
        .sort((x1, x2) =>
            x1.display_name.localeCompare(x2.display_name)
        );

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

// TODO: convert to JS temporarily as isolating changes
const availableAssetsSelector = state => assetsSelector(state).toJS();

export const marketsSelector = () => [];

export const assetFilterSelector = state => state.assetPicker;

export const shownAssetsSelector = createSelector(
    [availableAssetsSelector, assetFilterSelector], // todo: availableAssetsSelector
    (availableAssets, filter) =>
        doFilter(availableAssets, filter.get('query'), filter.get('market'), filter.get('submarket'))
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
