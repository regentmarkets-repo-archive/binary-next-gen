import { createStructuredSelector } from 'reselect';
import assetDetails from '../asset-details/assetDetailsSelectors';
import digitStats from '../digit-stats/digitStatsSelectors';
import dailyPrices from '../daily-prices/dailyPricesSelectors';

export default createStructuredSelector({
    details: assetDetails,
    digitStats,
    dailyPrices,
});
