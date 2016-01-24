import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector, submarketForAsset } from './AssetSelectors';
import { assetIndexSubmarketSelector } from './WorkspaceSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';

export const assetIndexSelector = state => toPlainJS(state.assetIndex);

export const indexTradeTypesSelector = createSelector(
    assetIndexSelector,
    index =>
        console.log(index) || index
            .map(symbols => symbols[2].map(type => type[1]))
            .reduce((prv, curr) => prv.concat(curr))
);

export const indexes = createSelector(
    [assetIndexSubmarketSelector, assetIndexSelector],
    (submarket, assetIndex) =>
        assetIndex
            .filter(a => submarketForAsset(a[0]) === submarket.id)
);

export default createStructuredSelector({
    submarket: assetIndexSubmarketSelector,
    assets: assetsSelector,
    assetIndex: assetIndexSelector,
    indexTradeTypes: indexTradeTypesSelector,
});
