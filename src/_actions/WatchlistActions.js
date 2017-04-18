import { trackEvent } from 'binary-utils/lib/Analytics';
import { WATCHLIST_TOGGLE_ASSET } from '../_constants/ActionTypes';
import { api, getTickHistory } from '../_data/LiveData';

export const watchlistToggleAsset = (
    symbol,
    isSubscribed,
) => async dispatch => {
    if (isSubscribed) {
        getTickHistory(symbol);
    } else {
        api.unsubscribeFromTick(symbol);
        trackEvent('Watchlist', 'Toggle', symbol);
    }
    dispatch({ type: WATCHLIST_TOGGLE_ASSET, symbol, isSubscribed });
};
