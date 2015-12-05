import * as types from '../_constants/ActionTypes';

export const serverDataTradingTimes = serverResponse => ({
    type: types.SERVER_DATA_TRADING_TIMES,
    serverResponse,
});

export const serverDataAssetIndex = serverResponse => ({
    type: types.SERVER_DATA_ASSET_INDEX,
    serverResponse,
});

export const serverDataActiveSymbols = serverResponse => ({
    type: types.SERVER_DATA_ACTIVE_SYMBOLS,
    serverResponse,
});
