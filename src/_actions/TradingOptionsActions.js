import { UPDATE_TRADING_OPTIONS } from '../_constants/ActionTypes';
import { updateFeedLicense } from './FeedLicenseActions';
import * as LiveData from '../_data/LiveData';

export const updateTradingOptions = (symbol, options) => ({
    type: UPDATE_TRADING_OPTIONS,
    symbol,
    options,
});

export const getTradingOptions = (symbol, onDone) =>
    (dispatch, getState) => {
        const { tradingOptions } = getState();
        if (!tradingOptions.get(symbol)) {
            LiveData.api.getContractsForSymbol(symbol).then(res => {
                dispatch(updateFeedLicense(symbol, res.contracts_for.feed_license));
                dispatch(updateTradingOptions(symbol, res.contracts_for.available));
                if (onDone) onDone();
            });
        } else {
            if (onDone) onDone();
        }
    };
