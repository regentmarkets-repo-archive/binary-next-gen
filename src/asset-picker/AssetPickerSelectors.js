import { createSelector, createStructuredSelector } from 'reselect';
import { groupArrToNestedArr } from 'binary-utils';
import { assetsSelector, watchlistSelector } from '../_store/directSelectors';


export const similarStr = (str1, str2) =>
    (str1 || '').toLowerCase().includes((str2 || '').toLowerCase());

const doesMatchFilter = (asset, filter, watchlist) =>
    filter.get('filter') === 'all' ||
        filter.get('filter') === asset.get('submarket') ||
        filter.get('filter') === asset.get('market') ||
        filter.get('filter') === 'open' && asset.get('exchange_is_open') ||
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
    [availableAssetsSelector, assetFilterSelector, watchlistSelector],
    (availableAssets, filter, watchlist) =>
        availableAssets
            .filter(asset => doesMatchQueryAndFilter(asset, filter, watchlist))
);

export const assetPickerItemsSelector = createSelector(
    [shownAssetsSelector, watchlistSelector],
    (shownAssets, watchlist) =>
        groupArrToNestedArr(shownAssets.map(asset => ({
            symbol: asset.get('symbol'),
            name: asset.get('display_name'),
            isInWatchlist: watchlist.has(asset.get('symbol')),
            market: asset.get('market'),
            submarket: asset.get('submarket'),
            marketName: asset.get('market_display_name'),
            submarketName: asset.get('submarket_display_name'),
            isOpen: !!asset.get('exchange_is_open'),
        })), 'submarket')
);

export const assetPickerMobileSelector = createStructuredSelector({
    selectedAsset: state => state.tradesParams.first().get('symbol'),
    index: () => 0,
});

export default createStructuredSelector({
    assetPickerItems: assetPickerItemsSelector,
	filter: assetFilterSelector,
});
