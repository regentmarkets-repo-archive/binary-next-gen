import { createSelector, createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import {
    assetIndexSelector,
    assetsSelector,
    assetIndexSubmarketSelector,
    assetIndexFilterSelector,
} from '../_store/directSelectors';

const assetSymbolsMatchedFilter = (assets, filter) =>
    assets
        .reduce((symbols, asset) => {
            if (asset.get('submarket') === filter || asset.get('market') === filter) {
                return symbols.push(asset.get('symbol'));
            }
            return symbols;
        }, List.of());

const shownAssetIndexRowsSelector = createSelector(
    [assetsSelector, assetIndexFilterSelector, assetIndexSelector],
    (assets, filter, assetIndex) => {
        const symbols = assetSymbolsMatchedFilter(assets, filter);
        return assetIndex
            .filter(a => symbols.some(x => x === a.get(0)));
    }
);

const assetIndexRowToDuration = row =>
    row ? `${row.get(2)}–${row.get(3)}` : '—';

export const assetIndexTableSelector = createSelector(
    shownAssetIndexRowsSelector,
    assetIndexRows => {
        // find union of all type
        const headers = assetIndexRows.reduce((prev, curr) => {
            const types = curr.get(2).map(durations => durations.get(1)).filter(t => !!t);
            return prev.merge(types);
        }, List.of());
        const data = assetIndexRows.map(row => {
            const name = row.get(1);
            const durations = headers
                .map(type =>
                    assetIndexRowToDuration(row.get(2).find(x => x.get(1) === type))
                );

            return durations.unshift(name);
        });

        return data.unshift(headers);
    }
);

export default createStructuredSelector({
    submarket: assetIndexSubmarketSelector,
    assetIndexRows: assetIndexTableSelector,
});
