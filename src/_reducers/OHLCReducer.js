import { fromJS, List, Map } from 'immutable';
import { getLast, mergeSortedArrays } from 'binary-utils';

import {
    SERVER_DATA_OHLC_STREAM,
    SERVER_DATA_CANDLES,
    UPDATE_CHART_DATA_BY_SYMBOL,
    RESET_CHART_DATA_BY_SYMBOL,
} from '../_constants/ActionTypes';

const initialState = new Map();

export const mergeCandles = (existingCandles, newCandles) => {
    if (!existingCandles || existingCandles.length === 0) {
        return newCandles;
    }

    if (!newCandles || newCandles.length === 0) {
        return existingCandles;
    }

    const existingGranularity = existingCandles[1].epoch - existingCandles[0].epoch;
    const newGranularity = newCandles[1].epoch - newCandles[0].epoch;
    const granularityDiff = Math.abs(existingGranularity - newGranularity);

    if (granularityDiff > 60) {
        return newCandles;
    }

    const lastNewTicksEpoch = getLast(newCandles).epoch;
    const lastExistingTickEpoch = getLast(existingCandles).epoch;

    // if existing ticks contains new ticks, ignore new ticks
    if (
        newCandles[0].epoch > existingCandles[0].epoch &&
        lastNewTicksEpoch < lastExistingTickEpoch
    ) {
        return existingCandles;
    }
    return mergeSortedArrays(existingCandles, newCandles, x => x.epoch, x => x.epoch);
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_OHLC_STREAM: {
            const symbol = action.serverResponse.ohlc.symbol;
            const { ohlc } = action.serverResponse;
            const newOHLC = {
                epoch: +(ohlc.open_time || ohlc.epoch),
                open: +ohlc.open,
                high: +ohlc.high,
                low: +ohlc.low,
                close: +ohlc.close,
            };
            return state.update(symbol, List.of(), v => v.takeLast(1000).push(newOHLC));
        }
        case SERVER_DATA_CANDLES: {
            const symbol = action.serverResponse.echo_req.ticks_history;
            const candles = action.serverResponse.candles.map(c => ({
                epoch: +c.epoch,
                open: +c.open,
                high: +c.high,
                low: +c.low,
                close: +c.close,
            }));

            const liveCandles = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeCandles(liveCandles, candles);
            if (merged.length === liveCandles.length) {
                return state;
            }
            return state.set(symbol, fromJS(merged));
        }
        case UPDATE_CHART_DATA_BY_SYMBOL: {
            const { symbol, data, dataType } = action;
            if (dataType !== 'candles') {
                return state;
            }
            const liveTicks = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeCandles(liveTicks, data);
            if (merged.length === liveTicks.length) {
                return state;
            }
            return state.set(symbol, fromJS(merged));
        }
        case RESET_CHART_DATA_BY_SYMBOL: {
            const { symbol, data } = action;
            const forceType = data.map(ohlc => ({
                epoch: +ohlc.epoch,
                open: +ohlc.open,
                high: +ohlc.high,
                low: +ohlc.low,
                close: +ohlc.close,
            }));
            return state.set(symbol, fromJS(forceType));
        }
        default:
            return state;
    }
};

