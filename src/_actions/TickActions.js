import * as types from '../_constants/ActionTypes';
import * as LiveData from '../_data/LiveData';

export const serverDataTickStream = serverResponse => ({
    type: types.SERVER_DATA_TICK_STREAM,
    serverResponse,
});

export const serverDataTickHistory = serverResponse => ({
    type: types.SERVER_DATA_TICK_HISTORY,
    serverResponse,
});

export const serverDataCandles = serverResponse => ({
    type: types.SERVER_DATA_CANDLES,
    serverResponse,
});

export const getTicksBySymbol = symbol =>
    (dispatch, getState) => {
        const { ticks } = getState();
        if (!ticks.get(symbol)) {
            LiveData.api.getTickHistory(symbol, { end: 'latest', count: 60 });
            LiveData.api.subscribeToTick(symbol);
        }
    };
