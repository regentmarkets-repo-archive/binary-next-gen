import { createSelector, createStructuredSelector } from 'reselect';
import { ticksSelector, watchlistSelector } from '../_store/directSelectors';
import { assetsBySymbolSelector } from '../_store/keySelectors';

const historyDiff = (history) => {
	if (!history || history.length < 2) return 0;

	return history[history.length - 1].quote - history[history.length - 2].quote;
};

export const watchlistViewSelector = createSelector(
    [ticksSelector, assetsBySymbolSelector, watchlistSelector],
    (ticks, assets, watchlist) =>
        watchlist.toSeq().map(symbol => {
			const history = ticks.get('symbol') || [];
			console.log(symbol, assets.get(symbol), assets.toJS());
			return {
				assetName: assets.getIn([symbol, 'display_name']),
				history,
				diff: historyDiff(history),
				quote: history[history.length - 1] || null,
				symbol,
			};
		}),
);

export default createStructuredSelector({
    watchlistView: watchlistViewSelector,
});
