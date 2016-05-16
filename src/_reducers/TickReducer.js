import { fromJS, List, Map } from 'immutable';
import mergeSortedArrays from 'binary-utils/lib/mergeSortedArrays';

import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY,
    UPDATE_CHART_DATA_BY_SYMBOL,
} from '../_constants/ActionTypes';

const initialState = new Map();

// it will skip merging if existing ticks already contains new ticks
export const mergeTicks = (existingTicks, newTicks) => {
    if (existingTicks.length === 0) {
        return newTicks;
    }
    if (newTicks[0].epoch > existingTicks[0].epoch) {
        return existingTicks;
    }
    return mergeSortedArrays(existingTicks, newTicks, x => x.epoch, x => x.epoch);
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.tick.symbol;
            const { tick } = action.serverResponse;
            const newTick = {
                epoch: +tick.epoch,
                quote: +tick.quote,
            };
            return state.update(symbol, List.of(), v => v.takeLast(4999).push(newTick));
        }
        case SERVER_DATA_TICK_HISTORY: {
            const symbol = action.serverResponse.echo_req.ticks_history;
            const history = action.serverResponse.history.times.map((t, idx) => {
                const quote = action.serverResponse.history.prices[idx];
                return { epoch: +t, quote: +quote };
            });

            const liveTicks = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeTicks(liveTicks, history);
            if (merged.length === liveTicks.length) {
                return state;
            }
            return state.set(symbol, fromJS(merged));
        }
        case UPDATE_CHART_DATA_BY_SYMBOL: {
            const { symbol, data } = action;
            const liveTicks = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeTicks(liveTicks, data);
            if (merged.length === liveTicks.length) {
                return state;
            }
            return state.set(symbol, fromJS(merged));
        }
        default:
            return state;
    }
};
