import { createStructuredSelector } from 'reselect';
import { assetsSelector, ticksSelector, watchlistSelector } from '../_store/baseSelectors';

export default createStructuredSelector({
    ticks: ticksSelector,
    assets: assetsSelector,
    watchlist: watchlistSelector,
});
