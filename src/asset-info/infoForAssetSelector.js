import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, workspaceSelector } from '../_store/directSelectors';

export const activeAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) => {
		const asset = assets.find(x => x.get('symbol') === workspace.get('infoForAsset'));

		return asset ? {
			symbol: asset.get('symbol'),
			name: asset.get('display_name'),
			isOpen: !!asset.get('exchange_is_open'),
		} : {};
	}
);

export default createStructuredSelector({
    asset: activeAssetSelector,
});
