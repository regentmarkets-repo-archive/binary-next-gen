import { Stack, Map } from 'immutable';

import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY,
} from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.echo_req.ticks;
            // window.console.log(action.serverResponse, action.serverResponse.echo_req, action.serverResponse.echo_req.tick);
            const { tick } = action.serverResponse;
            const newTick = {
                epoch: tick.epoch,
                quote: +tick.quote,
            };
            // window.console.log(symbol, newTick);
            return state.update(symbol, Stack.of(newTick), v => v.push(newTick)); // v.shift()
        }
        case SERVER_DATA_TICK_HISTORY: {
            const { symbol } = action.serverResponse.echo_req.ticks;
            return state.set(symbol, Stack.of(action.serverResponse.data));
        }
        default:
            return state;
    }
};
