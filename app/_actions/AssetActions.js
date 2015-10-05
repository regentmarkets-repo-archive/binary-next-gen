import * as types from '../_constants/ActionTypes';

export function filterAssets(query) {
    return {
        type: types.FILTER_ASSETS,
        query,
    };
}

export function serverDataMarkets(serverResponse) {
    return {
        type: types.SERVER_DATA_MARKETS,
        serverResponse,
    };
}

export function serverDataActiveSymbols(serverResponse) {
    return {
        type: types.SERVER_DATA_ACTIVE_SYMBOLS,
        serverResponse,
    };
}
