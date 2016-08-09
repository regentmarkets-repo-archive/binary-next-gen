import { createSelector, createStructuredSelector } from 'reselect';
import { epochToDate } from 'binary-utils';
import { dailyPricesSelector, workspaceSelector } from '../_store/directSelectors';

const currentAssetDailyPrices = createSelector(
    [dailyPricesSelector, workspaceSelector],
    (dailyPrices, workspace) =>
        (dailyPrices.get(workspace.get('infoForAsset')) || []).map(x => ({
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
