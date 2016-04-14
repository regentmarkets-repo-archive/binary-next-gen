import { UPDATE_TRADING_OPTIONS } from '../_constants/ActionTypes';
import { updateFeedLicense } from './FeedLicenseActions';
import { updateTradeParams } from './TradeActions';
import * as LiveData from '../_data/LiveData';

export const updateTradingOptions = (symbol, options) => ({
    type: UPDATE_TRADING_OPTIONS,
    symbol,
    options,
});

export const getTradingOptions = symbol =>
    (dispatch, getState) => {
        const { tradingOptions, workspace } = getState();
        const activeTradeIndex = workspace.get('activeTradeIndex');

        if (!tradingOptions.get(symbol)) {
            return LiveData.api.getContractsForSymbol(symbol)
                .then(res => {
                    dispatch(updateFeedLicense(symbol, res.contracts_for.feed_license));
                    dispatch(updateTradingOptions(symbol, res.contracts_for.available));
                }, err => {
                    dispatch(updateTradeParams(activeTradeIndex, 'contractForError', err.message));
                });
        }

        return Promise.resolve();
    };
