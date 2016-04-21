import { createSelector, createStructuredSelector } from 'reselect';
import groupByKey from 'binary-utils/lib/groupByKey';
import {
    assetsSelector,
    watchlistSelector,
} from '../_store/directSelectors';

export const symbolIdsSelector = createSelector(
     assetsSelector,
     assets => assets.map(v => v.get('symbol'))
);

export const similarStr = (str1, str2) =>
    (str1 || '').toLowerCase().includes((str2 || '').toLowerCase());

const doesMatchFilter = (asset, filter) =>
    filter.get('filter') === 'all' ||
        filter.get('filter') === asset.get('submarket') ||
        filter.get('filter') === asset.get('market');

const doesMatchQuery = (asset, filter) =>
    filter.get('query').trim() === '' ||
        similarStr(asset.get('symbol'), filter.get('query')) ||
        similarStr(asset.get('display_name'), filter.get('query')) ||
        similarStr(asset.get('market_display_name'), filter.get('query')) ||
        similarStr(asset.get('submarket_display_name'), filter.get('query'));

const doesMatchQueryAndFilter = (asset, filter) =>
    doesMatchFilter(asset, filter) && doesMatchQuery(asset, filter);

const availableAssetsSelector = assetsSelector;

export const assetFilterSelector = state => state.assetPicker;

export const shownAssetsSelector = createSelector(
    [availableAssetsSelector, assetFilterSelector], // todo: availableAssetsSelector
    (availableAssets, filter) =>
        availableAssets
            .filter(asset => doesMatchQueryAndFilter(asset, filter))
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
    (shownAssets, watchlist) => {
        const groupedAsset = groupByKey(shownAssets.map(asset => ({
            symbol: asset.get('symbol'),
            name: asset.get('display_name'),
            isInWatchlist: watchlist.has(asset.get('symbol')),
            market: asset.get('market_display_name'),
            submarket: asset.get('submarket_display_name'),
            isOpen: !!asset.get('exchange_is_open'),
        })), 'submarket');
        return groupedAsset;
    }
);

export default createStructuredSelector({
    availableAssets: availableAssetsSelector,
    assetPickerItems: assetPickerItemsSelector,
	filter: assetFilterSelector,
});
