import { createStructuredSelector } from 'reselect';

export const ticksSelector = state => state.ticks;
export const assetsSelector = state => state.assets;
export const watchlistSelector = state => state.watchlist;

export default createStructuredSelector({
    ticks: ticksSelector,
    assets: assetsSelector,
    watchlist: watchlistSelector,
});
