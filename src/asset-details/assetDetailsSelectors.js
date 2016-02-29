import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { assetIndexSelector, assetsSelector, tradingTimesSelector, workspaceSelector } from '../_store/directSelectors';

const AssetDetailsRecord = new Record({
	name: '',
    isOpen: false,
});

export const activeAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) => {
		const asset = assets.find(x => x.get('symbol') === workspace.get('selectedAsset'));

		return asset ? new AssetDetailsRecord({
			name: asset.get('display_name'),
			isOpen: !!asset.get('exchange_is_open'),
		}) : new AssetDetailsRecord({});
	}
);

export const activeAssetTradingTimesSelector = createSelector(
	[tradingTimesSelector, workspaceSelector],
	(tradingTimes, workspace) =>
		tradingTimes.find(x => x.get('symbol') === workspace.get('selectedAsset'))
);

export const activeAssetDurationsSelector = createSelector(
	[assetIndexSelector, workspaceSelector],
	(assetIndex, workspace) =>
		assetIndex.find(x => x.get(0) === workspace.get('selectedAsset'))
);

export default createStructuredSelector({
	activeAsset: activeAssetSelector,
	tradingTimes: activeAssetTradingTimesSelector,
	durations: activeAssetDurationsSelector,
});
