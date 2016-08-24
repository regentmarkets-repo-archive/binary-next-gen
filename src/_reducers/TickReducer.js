import { fromJS, List, Map } from 'immutable';
import { mergeSortedArrays, getLast } from 'binary-utils';

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

    if (!newTicks || newTicks.length === 0) {
        return existingTicks;
    }

    const lastNewTicksEpoch = getLast(newTicks).epoch;
    const oldestExistingTickEpoch = existingTicks[0].epoch;
    const lastExistingTickEpoch = getLast(existingTicks).epoch;
    const epochDiff = oldestExistingTickEpoch - lastNewTicksEpoch;

    // if new ticks are very old compared to existing ticks, ignore them
    if (epochDiff > 300) {          // 5 minutes
        return existingTicks;
    }

    // if existing ticks contains new ticks, ignore new ticks
    if (
        newTicks[0].epoch > existingTicks[0].epoch &&
            lastNewTicksEpoch < lastExistingTickEpoch
    ) {
        return existingTicks;
    }
    return mergeSortedArrays(existingTicks, newTicks, x => x.epoch, x => x.epoch);
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TICK_STREAM: {
            const symbol = action.serverResponse.tick.symbol;
            const { tick } = action.serverResponse;

            // Do not take old tick
            const selectedSymbol = state.get(symbol);
            const latestExistingTickEpoch = selectedSymbol && selectedSymbol.takeLast(1).getIn([0, 'epoch']);
            if (latestExistingTickEpoch && latestExistingTickEpoch > +tick.epoch) {
                return state;
            }

            const newTick = {
                epoch: +tick.epoch,
                quote: +tick.quote,
            };
            return state.update(symbol, List.of(), v => v.takeLast(1000).push(fromJS(newTick)));
        }
        case SERVER_DATA_TICK_HISTORY: {
            const { times, prices } = action.serverResponse.history;

            const symbol = action.serverResponse.echo_req.ticks_history;

            const formattedHistory = times.map((t, idx) => {
                const quote = prices[idx];
                return { epoch: +t, quote: +quote };
            });

            const liveTicks = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeTicks(liveTicks, formattedHistory);
            if (merged.length === liveTicks.length) {
                return state;
            }
            return state.set(symbol, fromJS(merged));
        }
        case UPDATE_CHART_DATA_BY_SYMBOL: {
            const { symbol, data, dataType } = action;
            if (dataType !== 'ticks') {
                return state;
            }
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
