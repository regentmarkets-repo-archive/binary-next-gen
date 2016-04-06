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

export const updateAssetIndexFilter = filter => ({
    type: types.UPDATE_ASSET_INDEX_FILTER,
    filter,
});

export const updateTradingTimesFilter = filter => ({
    type: types.UPDATE_TRADING_TIMES_FILTER,
    filter,
});

export const updateTransactionsFilter = filterIndex => ({
    type: types.UPDATE_TRANSACTIONS_FILTER,
    transactionsFilter: filterIndex,
});
