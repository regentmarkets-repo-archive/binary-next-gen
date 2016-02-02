import { UPDATE_TRADING_OPTIONS } from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const updateTradingOptions = (symbol, opts) => ({
    type: UPDATE_TRADING_OPTIONS,
    symbol,
    opts,
});

export const getTradingOptions = (symbol, cb) =>
    (dispatch, getState) => {
        const { tradingOptions } = getState();
        if (!tradingOptions.get(symbol)) {
            LiveData.api.getContractsForSymbol(symbol).then(res => {
                dispatch(updateTradingOptions(symbol, res.contracts_for.available));
                if (typeof cb === 'function') {
                    cb();
                }
            });
        } else if (typeof cb === 'function') {
            cb();
        }
    };
