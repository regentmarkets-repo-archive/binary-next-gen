import { Stack, Map } from 'immutable';

import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY
} from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.echo.ticks;
            const { epoch, quote } = action.serverResponse.data;
            const newTick = { epoch, quote };

            return state.update(symbol, Stack.of(newTick), (v) => v.push(newTick)); // v.shift()
        }
        case SERVER_DATA_TICK_HISTORY: {
            const { symbol } = action.serverResponse.echo.ticks;
            return state.set(symbol, Stack.of(action.serverResponse.data));
        }
        default:
            return state;
    }
};
