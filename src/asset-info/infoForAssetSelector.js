import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from '../_store/directSelectors';

export const activeAssetSelector = createSelector(
	[assetsSelector],
	(assets) => {
		const asset = assets.find(a => a.get('exchange_is_open') === 1);

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
