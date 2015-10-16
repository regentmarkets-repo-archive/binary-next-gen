import * as types from '../_constants/ActionTypes';

export function serverDataTradingTimes(serverResponse) {
    return {
        type: types.SERVER_DATA_TRADING_TIMES,
        serverResponse,
    };
}

export function serverDataAssetIndex(serverResponse) {
    return {
        type: types.SERVER_DATA_ASSET_INDEX,
        serverResponse,
    };
}

export function serverDataActiveSymbols(serverResponse) {
    return {
        type: types.SERVER_DATA_ACTIVE_SYMBOLS,
        serverResponse,
    };
}
