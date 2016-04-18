import { fromJS, List, Map } from 'immutable';
import mergeSortedArrays from 'binary-utils/lib/mergeSortedArrays';

import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY,
} from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.tick.symbol;
            const { tick } = action.serverResponse;
            const newTick = {
                epoch: +tick.epoch,
                quote: +tick.quote,
            };
            return state.update(symbol, List.of(), v => v.takeLast(60).push(newTick));
        }
        case SERVER_DATA_TICK_HISTORY: {
            const symbol = action.serverResponse.echo_req.ticks_history;
            const history = action.serverResponse.history.times.map((t, idx) => {
                const quote = action.serverResponse.history.prices[idx];
                return { epoch: +t, quote: +quote };
            }).slice(0, 60);

            const liveTicks = state.get('symbol') ? state.get('symbol') : [];
            const merged = mergeSortedArrays(liveTicks, history, x => x.epoch, x => x.epoch);
            return state.set(symbol, fromJS(merged));
        }
        default:
            return state;
    }
};
