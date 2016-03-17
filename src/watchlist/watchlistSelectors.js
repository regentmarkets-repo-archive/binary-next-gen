import { List, Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import {
	ticksSelector,
	watchlistSelector,
	selectedAssetSelector,
	activeTradeIndexSelector,
} from '../_store/directSelectors';
import { assetsBySymbolSelector } from '../_store/keySelectors';

export const WatchlistRecord = new Record({
	assetName: '',
	history: [],
	diff: 0,
	quote: 0,
	symbol: '',
});

const historyDiff = history =>
	history.size < 2 ?
		0 :
		history.get(history.size - 1).quote - history.get(history.size - 2).quote;

const historyQuote = history =>
	history.size === 0 ? 0 : history.get(history.size - 1).quote;

export const watchlistViewSelector = createSelector(
    [ticksSelector, assetsBySymbolSelector, watchlistSelector],
    (ticks, assets, watchlist) =>
        watchlist.toSeq().map(symbol => {
			const history = ticks.get(symbol) || new List([]);
			const asset = assets.get(symbol);

			return new WatchlistRecord({
				assetName: asset && asset.get('display_name'),
				history,
				diff: historyDiff(history),
				quote: historyQuote(history),
				symbol,
			});
		}),
);

export default createStructuredSelector({
	activeTradeIdx: activeTradeIndexSelector,
    watchlistView: watchlistViewSelector,
	selectedAsset: selectedAssetSelector,
});
