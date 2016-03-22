import * as types from '../_constants/ActionTypes';

export const updateFeedLicense = (symbol, license) => ({
    type: types.UPDATE_SYMBOL_FEED_LICENSE,
    symbol,
    license,
});
