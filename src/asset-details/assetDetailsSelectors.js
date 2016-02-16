import { createSelector, createStructuredSelector } from 'reselect';
import { assetIndexSelector, assetsSelector, tradingTimesSelector, workspaceSelector } from '../_store/directSelectors';
// import { assetIndexTableSelector } from '../asset-index/assetIndexSelectors';

export const activeAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) =>
		assets.find(x => x.get('symbol') === workspace.get('symbolSelected'))
);

export const activeAssetTradingTimesSelector = createSelector(
	[tradingTimesSelector, workspaceSelector],
	(tradingTimes, workspace) =>
		tradingTimes.find(x => x.get('symbol') === workspace.get('symbolSelected'))
);

export const activeAssetDurationsSelector = createSelector(
	[assetIndexSelector, workspaceSelector],
	(assetIndex, workspace) =>
		assetIndex.find(x => x.get(0) === workspace.get('symbolSelected'))
);

export default createStructuredSelector({
	activeAsset: activeAssetSelector,
	tradingTimes: activeAssetTradingTimesSelector,
	durations: activeAssetDurationsSelector,
});
