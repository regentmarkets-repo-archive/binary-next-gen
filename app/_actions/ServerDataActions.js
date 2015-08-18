import * as types from '../_constants/ActionTypes';

export function serverDataForAuthorize(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_AUTHORIZE,
        serverResponse,
    };
}

export function serverDataForMarkets(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_MARKETS,
        serverResponse,
    };
}

export function serverDataForOfferings(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_OFFERINGS,
        serverResponse,
    };
}

export function serverDataForActiveSymbols(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_ACTIVE_SYMBOLS,
        serverResponse,
    };
}
