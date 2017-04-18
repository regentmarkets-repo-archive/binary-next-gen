import { createSelector, createStructuredSelector } from 'reselect';
import { examinedAssetSelector } from '../_store/commonSelectors';
import assetDetails from '../asset-details/assetDetailsSelectors';
import digitStats from '../digit-stats/digitStatsSelectors';
import dailyPrices from '../daily-prices/dailyPricesSelectors';

export const activeAssetSelector = createSelector(
    [examinedAssetSelector],
    examinedAsset =>
        (examinedAsset
            ? {
                  symbol: examinedAsset.get('symbol'),
                  name: examinedAsset.get('display_name'),
                  isOpen: !!examinedAsset.get('exchange_is_open'),
              }
            : {}),
);

export default createStructuredSelector({
    asset: activeAssetSelector,
    details: assetDetails,
    digitStats,
    dailyPrices,
});
