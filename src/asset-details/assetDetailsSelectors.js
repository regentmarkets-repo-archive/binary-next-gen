import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import {
    assetIndexSelector,
    tradingTimesSelector,
} from '../_store/directSelectors';
import { examinedAssetSelector } from '../_store/commonSelectors';

const AssetDetailsRecord = new Record({
    name: '',
    isOpen: false,
});

const activeAssetSelector = createSelector(
    [examinedAssetSelector],
    examinedAsset =>
        new AssetDetailsRecord(
            examinedAsset
                ? {
                      name: examinedAsset.get('display_name'),
                      isOpen: !!examinedAsset.get('exchange_is_open'),
                  }
                : {},
        ),
);

const activeAssetTradingTimesSelector = createSelector(
    [examinedAssetSelector, tradingTimesSelector],
    (examinedAsset, tradingTimes) =>
        tradingTimes.find(x => x.get('symbol') === examinedAsset.get('symbol')),
);

const activeAssetDurationsSelector = createSelector(
    [examinedAssetSelector, assetIndexSelector],
    (examinedAsset, assetIndex) =>
        assetIndex.find(x => x.get(0) === examinedAsset.get('symbol')),
);

export default createStructuredSelector({
    activeAsset: activeAssetSelector,
    tradingTimes: activeAssetTradingTimesSelector,
    durations: activeAssetDurationsSelector,
});
