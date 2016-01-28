import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { assetIndexSubmarketSelector } from './WorkspaceSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';

export const assetIndexSelector = state => toPlainJS(state.assetIndex);

export const assetSymbolsInSubmarket = (assets, submarket) =>
    assets
        .reduce((symbols, asset) => {
            if (asset.submarket === submarket) {
                symbols.push(asset.symbol);
            }
            return symbols;
        }, []);

export const shownAssetIndexRowsSelector = createSelector(
    [assetsSelector, assetIndexSubmarketSelector, assetIndexSelector],
    (assets, submarket, assetIndex) => {
        const symbols = assetSymbolsInSubmarket(assets, submarket);
        return assetIndex
            .filter(a => symbols.some(x => x === a[0]));
    },
);

export const assetIndexHeadersSelector = createSelector(
    shownAssetIndexRowsSelector,
    shownAssetIndexRows =>
        shownAssetIndexRows
            .reduce((acc, row) =>
                (acc[2].length > row[2].length ? acc : row), ['', '', []])[2]
            .map(x => x[1])
);

const assetIndexRowToDuration = row =>
    row ? `${row[2]}–${row[3]}` : '—';

export const durationsSelector = createSelector(
    [shownAssetIndexRowsSelector, assetIndexHeadersSelector],
    (shownAssetIndexRows, headers) =>
        shownAssetIndexRows
            .map(assetIndexRow => ({
                assetName: assetIndexRow[1],
                times: headers.map((header, idx) =>
                    assetIndexRowToDuration(assetIndexRow[2][idx])
                ),
            }))
);

export default createStructuredSelector({
    submarket: assetIndexSubmarketSelector,
    headers: assetIndexHeadersSelector,
    durations: durationsSelector,
});
