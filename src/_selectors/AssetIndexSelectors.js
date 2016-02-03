import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { assetIndexSubmarketSelector } from './WorkspaceSelectors';
import { toPlainJS } from '../_utils/ObjectUtils';
import { shallowMerge } from '../_utils/ArrayUtils';

export const assetIndexSelector = state => toPlainJS(state.assetIndex);

const assetSymbolsInSubmarket = (assets, submarket) =>
    assets
        .reduce((symbols, asset) => {
            if (asset.submarket === submarket) {
                symbols.push(asset.symbol);
            }
            return symbols;
        }, []);

const shownAssetIndexRowsSelector = createSelector(
    [assetsSelector, assetIndexSubmarketSelector, assetIndexSelector],
    (assets, submarket, assetIndex) => {
        const symbols = assetSymbolsInSubmarket(assets, submarket);
        return assetIndex
            .filter(a => symbols.some(x => x === a[0]));
    }
);

const assetIndexRowToDuration = row =>
    row ? `${row[2]}–${row[3]}` : '—';

const assetIndexTableSelector = createSelector(
    shownAssetIndexRowsSelector,
    assetIndexRows => {
        // find union of all type
        const headers = assetIndexRows.reduce((prev, curr) => {
            const types = curr[2].map(durations => durations[1]).filter(t => !!t);
            return shallowMerge(prev, types);
        }, []);
        const data = assetIndexRows.map(row => {
            const name = row[1];
            const durations = headers
                .map(type =>
                    assetIndexRowToDuration(row[2].find(x => x[1] === type))
                );
            durations.unshift(name);
            return durations;
        });
        data.unshift(headers);
        return data;
    }
);

const assetIndexHeadersSelector = createSelector(
    shownAssetIndexRowsSelector,
    shownAssetIndexRows =>
        shownAssetIndexRows
            .reduce((acc, row) =>
                (acc[2].length > row[2].length ? acc : row), ['', '', []])[2]
            .map(x => x[1])
);

const durationsSelector = createSelector(
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
    assetIndexRows: assetIndexTableSelector,
});
