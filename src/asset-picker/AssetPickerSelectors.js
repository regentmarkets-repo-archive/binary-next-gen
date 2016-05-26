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

const doesMatchFilter = (asset, filter, watchlist) =>
    filter.get('filter') === 'all' ||
        filter.get('filter') === asset.get('submarket') ||
        filter.get('filter') === asset.get('market') ||
        filter.get('filter') === 'favorites' && watchlist.has(asset.get('symbol'));

const doesMatchQuery = (asset, filter, watchlist) =>
    filter.get('query').trim() === '' ||
        similarStr(asset.get('symbol'), filter.get('query')) ||
        similarStr(asset.get('display_name'), filter.get('query')) ||
        similarStr(asset.get('market_display_name'), filter.get('query')) ||
        similarStr(asset.get('submarket_display_name'), filter.get('query')) ||
        filter.get('query') === 'favorites' && watchlist.has(asset.get('symbol'));

const doesMatchQueryAndFilter = (asset, filter, watchlist) =>
    doesMatchFilter(asset, filter, watchlist) && doesMatchQuery(asset, filter, watchlist);

const availableAssetsSelector = assetsSelector;

export const assetFilterSelector = state => state.assetPicker;

export const shownAssetsSelector = createSelector(
    [availableAssetsSelector, assetFilterSelector, watchlistSelector], // todo: availableAssetsSelector
    (availableAssets, filter, watchlist) =>
        availableAssets
            .filter(asset => doesMatchQueryAndFilter(asset, filter, watchlist))
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

export const assetPickerMobileSelector = createStructuredSelector({
    selectedAsset: state => state.tradesParams.first().get('symbol'),
    tradeIdx: () => 0,
});

export default createStructuredSelector({
    availableAssets: availableAssetsSelector,
    assetPickerItems: assetPickerItemsSelector,
	filter: assetFilterSelector,
});
