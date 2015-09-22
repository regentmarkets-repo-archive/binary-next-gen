import * as types from '../_constants/ActionTypes';

export function serverDataTickStream(serverResponse) {
    return {
        type: types.SERVER_DATA_TICK_STREAM,
        serverResponse,
    };
}

export function serverDataTickHistory(serverResponse) {
    return {
        type: types.SERVER_DATA_TICK_HISTORY,
        serverResponse,
    };
}
