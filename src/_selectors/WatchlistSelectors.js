import { createSelector } from 'reselect';

export const ticksSelector = state => state.ticks;
export const assetsSelector = state => state.assets;
export const watchlistSelector = state => state.watchlist;

export default createSelector([
        ticksSelector,
        assetsSelector,
        watchlistSelector,
    ], (ticks, assets, watchlist) => ({
        ticks,
        assets,
        watchlist,
    })
);
