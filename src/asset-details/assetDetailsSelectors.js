import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector, workspaceSelector } from '../_store/directSelectors';

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


export default createStructuredSelector({
	activeAsset: activeAssetSelector,
	tradingTimes: activeAssetTradingTimesSelector,
});
