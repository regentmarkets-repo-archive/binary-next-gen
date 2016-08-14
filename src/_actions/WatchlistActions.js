import { trackEvent } from 'binary-utils/lib/Analytics';
import { WATCHLIST_TOGGLE_ASSET } from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';

export const watchlistToggleAsset = (symbol, isSubscribed) =>
    dispatch => {
        if (isSubscribed) {
            api.subscribeToTick(symbol);
        } else {
            api.unsubscribeFromTick(symbol);
            trackEvent('Watchlist', 'Toggle', symbol);
        }
        dispatch({ type: WATCHLIST_TOGGLE_ASSET, symbol, isSubscribed });
    };
