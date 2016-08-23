import { trackEvent } from 'binary-utils/lib/Analytics';
import { WATCHLIST_TOGGLE_ASSET } from '../_constants/ActionTypes';
import { api } from '../_data/LiveData';

export const watchlistToggleAsset = (symbol, isSubscribed) =>
    async (dispatch) => {
        if (isSubscribed) {
            try {
                await api.getTickHistory(symbol, { end: 'latest', count: 10, subscribe: 1 });
            } catch (err) {
                await api.getTickHistory(symbol, { end: 'latest', count: 10 });
            }
        } else {
            api.unsubscribeFromTick(symbol);
            trackEvent('Watchlist', 'Toggle', symbol);
        }
        dispatch({ type: WATCHLIST_TOGGLE_ASSET, symbol, isSubscribed });
    };
