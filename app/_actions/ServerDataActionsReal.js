import * as types from '../_constants/ActionTypes';

export function serverDataForAuthorize(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_AUTHORIZE,
        serverResponse,
    };
}

export function serverDataForBalance(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_BALANCE,
        serverResponse,
    };
}

export function serverDataForMarkets(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_MARKETS,
        serverResponse,
    };
}

export function serverDataForActiveSymbols(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_ACTIVE_SYMBOLS,
        serverResponse,
    };
}

export function serverDataForTradingTimes(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_TRADING_TIMES,
        serverResponse,
    };
}

export function serverDataForStatement(serverResponse) {
    return {
        type: types.SERVER_DATA_FOR_STATEMENT,
        serverResponse,
    };
}
