import { SERVER_DATA_OHLC_STREAM, SERVER_DATA_CANDLES } from '../_constants/ActionTypes';

export const serverDataOHLCStream = serverResponse => ({
    type: SERVER_DATA_OHLC_STREAM,
    serverResponse,
});

export const serverDataCandles = serverResponse => ({
    type: SERVER_DATA_CANDLES,
    serverResponse,
});
