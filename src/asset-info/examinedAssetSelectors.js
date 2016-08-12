import { createSelector, createStructuredSelector } from 'reselect';
import { examinedAssetSelector } from '../_store/commonSelectors';

export const activeAssetSelector = createSelector(
	[examinedAssetSelector],
	examinedAsset =>
		examinedAsset ? {
			symbol: examinedAsset.get('symbol'),
			name: examinedAsset.get('display_name'),
			isOpen: !!examinedAsset.get('exchange_is_open'),
		} : {}
);

export default createStructuredSelector({
    asset: activeAssetSelector,
});
