import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, workspaceSelector } from '../_store/directSelectors';

export const activeAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) =>
		assets.find(x => x.get('symbol') === workspace.get('symbolSelected'))
);

export default createStructuredSelector({
	activeAsset: activeAssetSelector,
});
