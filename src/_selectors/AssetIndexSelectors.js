import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { assetIndexSubmarketSelector } from './WorkspaceSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';

export const assetIndexSelector = state => toPlainJS(state.assetIndex);

export const submarketForAsset = (assets, symbol) =>
    assets.find(x => x.symbol === symbol).submarket;

export const shownAssetIndexRowsSelector = createSelector(
    [assetsSelector, assetIndexSubmarketSelector, assetIndexSelector],
    (assets, submarket, assetIndex) =>
        assetIndex
            .filter(a => submarketForAsset(assets, a[0]) === submarket.id)
);

export const assetIndexHeadersSelector = createSelector(
    shownAssetIndexRowsSelector,
    shownAssetIndexRows =>
        shownAssetIndexRows.map(col => col[1])
);

export const indexTradeTypesSelector = createSelector(
    assetIndexSelector,
    index =>
        index.length === 0 ?
            [] :
            index
                .filter(symbols => symbols[2])
                .map(symbols => symbols[2].map(type => type[1]))
                .reduce((prv, curr) => prv.concat(curr))
);

export const durationsSelector = createSelector(
    shownAssetIndexRowsSelector,
    shownAssetIndexRows =>
        shownAssetIndexRows
            .map(assetIndexRow => ({
                assetName: assetIndexRow[1],
                times: assetIndexRow[2].map(x => x[2] + ' _ ' + x[3]),
            }))
);

export default createStructuredSelector({
    submarket: assetIndexSubmarketSelector,
    headers: assetIndexHeadersSelector,
    durations: durationsSelector,
});
