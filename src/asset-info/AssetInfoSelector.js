import { createStructuredSelector } from 'reselect';
import assetInfo from './infoForAssetSelector';
import assetDetails from '../asset-details/assetDetailsSelectors';
import digitStats from '../digit-stats/digitStatsSelectors';
import dailyPrices from '../daily-prices/dailyPricesSelectors';

export default createStructuredSelector({
    asset: assetInfo,
    details: assetDetails,
    digitStats: digitStats,
    dailyPrices: dailyPrices,
});
