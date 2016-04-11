import { WATCHLIST_TOGGLE_ASSET } from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';
import { trackEvent } from 'binary-utils/lib/Analytics';

export const watchlistToggleAsset = (symbol, isSubscribed) =>
    dispatch => {
        if (isSubscribed) {
            LiveData.api.subscribeToTick(symbol);
        } else {
            LiveData.api.unsubscribeFromTick(symbol);
            trackEvent('favor-asset', { symbol });
        }
        dispatch({ type: WATCHLIST_TOGGLE_ASSET, symbol, isSubscribed });
    };
