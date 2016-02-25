import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const updateTradingTimesDate = date =>
    dispatch => {
        LiveData.api.getTradingTimes(date);
        dispatch({
            type: types.UPDATE_TRADING_TIMES_DATE,
            date,
        });
    };

export const updateAssetIndexSubmarket = submarket => ({
    type: types.UPDATE_ASSET_INDEX_SUBMARKET,
    submarket,
});

export const updateTransactionsFilter = filterIndex => ({
    type: types.UPDATE_TRANSACTIONS_FILTER,
    transactionsFilter: filterIndex,
});
