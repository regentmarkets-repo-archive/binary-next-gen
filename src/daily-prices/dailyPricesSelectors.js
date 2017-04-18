import { createSelector, createStructuredSelector } from 'reselect';
import { epochToDate } from 'binary-utils';
import { dailyPricesSelector } from '../_store/directSelectors';
import { examinedAssetSelector } from '../_store/commonSelectors';

const currentAssetDailyPrices = createSelector(
    [examinedAssetSelector, dailyPricesSelector],
    (examinedAsset, dailyPrices) =>
        (dailyPrices.get(examinedAsset.get('symbol')) || []).map(x => ({
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
