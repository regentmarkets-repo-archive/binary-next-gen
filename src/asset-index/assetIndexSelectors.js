import { createSelector, createStructuredSelector } from 'reselect';
import { assetsSelector } from '../_store/baseSelectors';
import { assetIndexSubmarketSelector } from '../workspace/workspaceSelectors';
import { shallowMerge } from '../_utils/ArrayUtils';

export const assetIndexSelector = state => state.assetIndex;

const assetSymbolsInSubmarket = (assets, submarket) =>
    assets
        .reduce((symbols, asset) => {
            if (asset.get('submarket') === submarket) {
                symbols.push(asset.get('symbol'));
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

export default createStructuredSelector({
    submarket: assetIndexSubmarketSelector,
    assetIndexRows: assetIndexTableSelector,
});
