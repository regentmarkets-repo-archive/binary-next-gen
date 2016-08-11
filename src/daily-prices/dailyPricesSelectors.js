import { createSelector, createStructuredSelector } from 'reselect';
import { epochToDate } from 'binary-utils';
import { dailyPricesSelector, assetsSelector } from '../_store/directSelectors';

const currentAssetDailyPrices = createSelector(
    [dailyPricesSelector, assetsSelector],
    (dailyPrices, assets) => {
        const selectedAsset = assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
        return (dailyPrices.get(selectedAsset) || []).map(x => ({
                date: epochToDate(x.get('epoch')),
                open: +x.get('open'),
                high: +x.get('high'),
                low: +x.get('low'),
                close: +x.get('close'),
            }));
    }
);

export default createStructuredSelector({
    dailyPrices: currentAssetDailyPrices,
});
