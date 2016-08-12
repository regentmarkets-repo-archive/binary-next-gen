import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { assetIndexSelector, assetsSelector, tradingTimesSelector, workspaceSelector } from '../_store/directSelectors';

const AssetDetailsRecord = new Record({
	name: '',
    isOpen: false,
});

const activeAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) => {
		const assetExist = assets.find(x => x.get('symbol') === workspace.get('infoForAsset'));
		const asset = assetExist || assets.find(a => a.get('exchange_is_open') === 1);

		return new AssetDetailsRecord(asset ? {
			name: asset.get('display_name'),
			isOpen: !!asset.get('exchange_is_open'),
		} : {});
	}
);

const activeAssetTradingTimesSelector = createSelector(
	[tradingTimesSelector, assetsSelector, workspaceSelector],
	(tradingTimes, assets, workspace) => {
		const assetExist = assets.find(x => x.get('symbol') === workspace.get('infoForAsset'));
		const selectedAsset = assetExist ?
									assetExist.get('symbol') :
								assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
		return tradingTimes.find(x => x.get('symbol') === selectedAsset);
	}
);

const activeAssetDurationsSelector = createSelector(
	[assetIndexSelector, assetsSelector, workspaceSelector],
	(assetIndex, assets, workspace) => {
		const assetExist = assets.find(x => x.get('symbol') === workspace.get('infoForAsset'));
		const selectedAsset = assetExist ?
								assetExist.get('symbol') :
								assets.find(a => a.get('exchange_is_open') === 1).get('symbol');
		return assetIndex.find(x => x.get(0) === selectedAsset);
	}
);

export default createStructuredSelector({
	activeAsset: activeAssetSelector,
	tradingTimes: activeAssetTradingTimesSelector,
	durations: activeAssetDurationsSelector,
});
