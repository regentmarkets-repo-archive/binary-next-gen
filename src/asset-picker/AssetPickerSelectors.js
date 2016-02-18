import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, watchlistSelector, workspaceSelector } from '../_store/directSelectors';

export const symbolIdsSelector = createSelector(
     assetsSelector,
     assets => assets.map(v => v.get('symbol'))
);

export const similarStr = (str1 = '', str2 = '') =>
    str1.toLowerCase().includes(str2.toLowerCase());

const doesMatchMarket = (asset, filter) =>
    filter.get('submarket') === '' ||
        filter.get('submarket') === asset.get('submarket');

const doesMatchQuery = (asset, filter) =>
    filter.get('query').trim() === '' ||
        similarStr(asset.get('symbol'), filter.get('query')) ||
        similarStr(asset.get('display_name'), filter.get('query')) ||
        similarStr(asset.get('market_display_name'), filter.get('query')) ||
        similarStr(asset.get('submarket_display_name'), filter.get('query'));

const doesMatchFilter = (asset, filter) =>
    doesMatchMarket(asset, filter) && doesMatchQuery(asset, filter);

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

export const assetFilterSelector = state => state.assetPicker;

export const shownAssetsSelector = createSelector(
    [availableAssetsSelector, assetFilterSelector], // todo: availableAssetsSelector
    (availableAssets, filter) =>
        availableAssets
            .filter(asset => doesMatchFilter(asset, filter))
);

export const sortedShownAssetsSelector = createSelector(
    [shownAssetsSelector],
    shownAssets =>
        shownAssets
            .sort((x1, x2) =>
                 x1.get('display_name').localeCompare(x2.get('display_name'))
            )
);

export const sortedByMarketShownAssetsSelector = createSelector(
    [shownAssetsSelector],
    shownAssets =>
        shownAssets
            .sort((x1, x2) => {
                 const marketDiff = x1.get('market_display_name').localeCompare(x2.get('market_display_name'));
                 if (marketDiff !== 0) return marketDiff;
                 const submarketDiff = x1.get('submarket_display_name').localeCompare(x2.get('submarket_display_name'));
                 if (submarketDiff !== 0) return submarketDiff;
                 return x1.get('display_name').localeCompare(x2.get('display_name'));
             })
);

export const assetPickerItemsSelector = createSelector(
    [sortedByMarketShownAssetsSelector, watchlistSelector],
    (shownAssets, watchlist) =>
        shownAssets.map(asset => ({
            symbol: asset.get('symbol'),
            name: asset.get('display_name'),
            isInWatchlist: watchlist.has(asset.get('symbol')),
            market: asset.get('market_display_name'),
            submarket: asset.get('submarket_display_name'),
        })),
);

export default createStructuredSelector({
    availableAssets: availableAssetsSelector,
    assetPickerItems: assetPickerItemsSelector,
	filter: assetFilterSelector,
	workspace: workspaceSelector,
});
