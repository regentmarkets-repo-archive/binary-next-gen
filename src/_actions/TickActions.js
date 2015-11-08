import * as types from '../_constants/ActionTypes';

export const serverDataTickStream = serverResponse => ({
    type: types.SERVER_DATA_TICK_STREAM,
    serverResponse,
});

export const serverDataTickHistory = serverResponse => ({
    type: types.SERVER_DATA_TICK_HISTORY,
    serverResponse,
});
