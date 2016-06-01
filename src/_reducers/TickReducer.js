import { fromJS, List, Map } from 'immutable';
import mergeSortedArrays from 'binary-utils/lib/mergeSortedArrays';
import getLastTick from 'binary-utils/lib/getLastTick';

import {
    SERVER_DATA_TICK_STREAM,
    SERVER_DATA_TICK_HISTORY,
    UPDATE_CHART_DATA_BY_SYMBOL,
} from '../_constants/ActionTypes';

const initialState = new Map();

// it will skip merging if existing ticks already contains new ticks
export const mergeTicks = (existingTicks, newTicks) => {
    if (!existingTicks || existingTicks.length === 0) {
        return newTicks;
    }

    const lastNewTicksEpoch = getLastTick(newTicks).epoch;
    const oldestExistingTickEpoch = existingTicks[0].epoch;
    const epochDiff = oldestExistingTickEpoch - lastNewTicksEpoch;
    // Do not merge if ticks are very old to prevent gap
    if (epochDiff > 300) {          // 5 minutes
        return existingTicks;
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
            return state.update(symbol, List.of(), v => v.takeLast(2000).push(newTick));
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
