import { UPDATE_TRADING_OPTIONS, TRADING_OPTIONS_ERROR } from '../_constants/ActionTypes';
import { updateFeedLicense } from './FeedLicenseActions';
import * as LiveData from '../_data/LiveData';

export const updateTradingOptions = (symbol, options) => ({
    type: UPDATE_TRADING_OPTIONS,
    symbol,
    options,
});

export const updateTradingOptionsErr = (symbol, err) => ({
    type: TRADING_OPTIONS_ERROR,
    symbol,
    err,
});

export const getTradingOptions = symbol =>
    (dispatch, getState) => {
        const { tradingOptions } = getState();

        if (!tradingOptions.get(symbol)) {
            return LiveData.api.getContractsForSymbol(symbol)
                .then(res => {
                    dispatch(updateFeedLicense(symbol, res.contracts_for.feed_license));
                    dispatch(updateTradingOptions(symbol, res.contracts_for.available));
                }, err => {
                    dispatch(updateTradingOptionsErr(symbol, err));
                });
        }

        return Promise.resolve();
    };
