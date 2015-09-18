import * as types from '../_constants/ActionTypes';

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

export function serverDataTradingTimes(serverResponse) {
    return {
        type: types.SERVER_DATA_TRADING_TIMES,
        serverResponse,
    };
}

export function serverDataStatement(serverResponse) {
    return {
        type: types.SERVER_DATA_STATEMENT,
        serverResponse,
    };
}

export function serverDataTickHistory(serverResponse) {
    return {
        type: types.SERVER_DATA_TICK_STREAM,
        serverResponse,
    };
}

export function serverDataTickStream(serverResponse) {
    return {
        type: types.SERVER_DATA_TICK_HISTORY,
        serverResponse,
    };
}
