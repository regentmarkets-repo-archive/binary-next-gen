import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { assetIndexSelector, assetsSelector, tradingTimesSelector } from '../_store/directSelectors';

const AssetDetailsRecord = new Record({
	name: '',
    isOpen: false,
});

const activeAssetSelector = createSelector(
	[assetsSelector],
	(assets) => {
		const asset = assets.find(a => a.get('exchange_is_open') === 1);

		return new AssetDetailsRecord(asset ? {
			name: asset.get('display_name'),
			isOpen: !!asset.get('exchange_is_open'),
		} : {});
	}
);

const activeAssetTradingTimesSelector = createSelector(
	[tradingTimesSelector, assetsSelector],
	(tradingTimes, assets) => {
		const selectedAsset = assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
		return tradingTimes.find(x => x.get('symbol') === selectedAsset);
	}
);

const activeAssetDurationsSelector = createSelector(
	[assetIndexSelector, assetsSelector],
	(assetIndex, assets) => {
		const selectedAsset = assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
		return assetIndex.find(x => x.get(0) === selectedAsset);
	}
);

export default createStructuredSelector({
	activeAsset: activeAssetSelector,
	tradingTimes: activeAssetTradingTimesSelector,
	durations: activeAssetDurationsSelector,
});
