import { fromJS, List, Map } from 'immutable';
import { mergeTicks } from './TickReducer';

import {
    SERVER_DATA_OHLC_STREAM,
    SERVER_DATA_CANDLES,
    UPDATE_CHART_DATA_BY_SYMBOL,
} from '../_constants/ActionTypes';

const initialState = new Map();

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
            const granularity = action.serverResponse.echo_req.granularity;
            if (granularity !== 60) {
                return state;
            }
            const symbol = action.serverResponse.echo_req.ticks_history;
            const candles = action.serverResponse.candles.map(c => ({
                epoch: +c.epoch,
                open: +c.open,
                high: +c.high,
                low: +c.low,
                close: +c.close,
            }));

            const liveCandles = state.get(symbol) ? state.get(symbol).toJS() : [];
            const merged = mergeTicks(liveCandles, candles);
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

