import { List, Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { pipsToDigits } from 'binary-utils';
import { ticksSelector, watchlistSelector } from '../_store/directSelectors';
import { assetsBySymbolSelector } from '../_store/keySelectors';

export const WatchlistRecord = new Record({
	assetName: '',
	history: [],
	diff: 0,
	quote: 0,
	digits: 2,
	symbol: '',
	isOpen: false,
});

const historyDiff = history =>
	history.size < 2 ?
		0 :
		history.get(history.size - 1).get('quote') - history.get(history.size - 2).get('quote');

const historyQuote = history =>
	history.size === 0 ? 0 : history.get(history.size - 1).get('quote');

export const watchlistViewSelector = createSelector(
    [ticksSelector, assetsBySymbolSelector, watchlistSelector],
    (ticks, assets, watchlist) =>
        watchlist.toSeq().filter(symbol => assets.has(symbol)).map(symbol => {
			const history = ticks.get(symbol) || new List([]);
			const asset = assets.get(symbol);

			return new WatchlistRecord({
				assetName: asset && asset.get('display_name'),
				digits: asset && pipsToDigits(+asset.get('pip')),
				isOpen: asset && !!asset.get('exchange_is_open'),
				history,
				diff: historyDiff(history),
				quote: historyQuote(history),
				symbol,
			});
		}),
);

export default createStructuredSelector({
    watchlistView: watchlistViewSelector,
});
