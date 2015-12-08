import { WATCHLIST_FAVOR_ASSET, WATCHLIST_UNFAVOR_ASSET } from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const watchlistFavorAsset = symbol => {
    return dispatch => {
        LiveData.api.subscribeToTick(symbol);
        dispatch({ type: WATCHLIST_FAVOR_ASSET, symbol: symbol });
    };
};

export const watchlistUnfavorAsset = symbol => {
    return dispatch => {
        LiveData.api.unsubscribeFromTick(symbol);
        dispatch({ type: WATCHLIST_UNFAVOR_ASSET, symbol: symbol });
    };
};
