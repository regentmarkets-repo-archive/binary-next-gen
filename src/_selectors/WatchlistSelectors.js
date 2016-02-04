import { createStructuredSelector } from 'reselect';
import { toPlainJS } from '../_utils/ObjectUtils';
import { assetsSelector } from './AssetSelectors';

export const ticksSelector = state => toPlainJS(state.ticks);
export const watchlistSelector = state => toPlainJS(state.watchlist);

export default createStructuredSelector({
    ticks: ticksSelector,
    assets: assetsSelector,
    watchlist: watchlistSelector,
});
