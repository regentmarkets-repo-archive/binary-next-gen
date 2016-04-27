import { createSelector, createStructuredSelector } from 'reselect';
import { dailyPricesSelector } from '../_store/directSelectors';
import epochToDate from 'binary-utils/lib/epochToDate';

const currentAssetDailyPrices = createSelector(
    dailyPricesSelector,
    dailyPrices =>
        (dailyPrices.get('R_100') || []).map(x => ({
            date: epochToDate(x.get('epoch')),
            open: +x.get('open'),
            high: +x.get('high'),
            low: +x.get('low'),
            close: +x.get('close'),
        })),
);

export default createStructuredSelector({
    dailyPrices: currentAssetDailyPrices,
});
