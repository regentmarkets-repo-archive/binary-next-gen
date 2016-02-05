import { createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';

export const ticksSelector = state => state.ticks;
export const watchlistSelector = state => state.watchlist;

export default createStructuredSelector({
    ticks: ticksSelector,
    assets: assetsSelector,
    watchlist: watchlistSelector,
});
