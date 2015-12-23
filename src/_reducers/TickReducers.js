import { List, Map } from 'immutable';

import {
    SERVER_DATA_TICK_STREAM,
} from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.tick.symbol;
            const { tick } = action.serverResponse;
            const newTick = {
                epoch: tick.epoch,
                quote: +tick.quote,
            };
            return state.update(symbol, List.of(newTick), v => v.takeLast(60).push(newTick));
        }
        default:
            return state;
    }
};
