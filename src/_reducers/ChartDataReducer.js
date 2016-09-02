import { fromJS } from 'immutable';
import {
    UPDATE_CHART_DATA_BY_CONTRACT,
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_OHLC_STREAM,
    SERVER_DATA_TICK_STREAM,
} from '../_constants/ActionTypes';
import { mergeTicks } from './TickReducer';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_DATA_BY_CONTRACT: {
            const { contractID, data, dataType, symbol, isSold } = action;
            const existing = state.hasIn([contractID, dataType]) ? state.getIn([contractID, dataType]).toJS() : [];
            const merged = mergeTicks(existing, data);

            if (merged.length === existing.length) {
                return state;
            }
            return state
                .setIn([contractID, dataType], fromJS(merged))
                .setIn([contractID, 'symbol'], symbol)
                .setIn([contractID, 'isSold'], isSold);
        }
        case SERVER_DATA_OHLC_STREAM: {
            const { ohlc } = action.serverResponse;
            const symbol = ohlc.symbol;
            const newOHLC = {
                epoch: +(ohlc.open_time || ohlc.epoch),
                open: +ohlc.open,
                high: +ohlc.high,
                low: +ohlc.low,
                close: +ohlc.close,
            };
            return state.map(v => {
                if (v.get('symbol') === symbol && !v.get('isSold')) {
                    const existingCandles = v.get('candles', fromJS([]));
                    const updatedCandles = existingCandles.takeLast(1000).push(newOHLC);
                    return v.set('candles', updatedCandles);
                }
                return v;
            });
        }
        case SERVER_DATA_TICK_STREAM: {
            // append extra ticks to store, so that chart looks clearer

            const { tick } = action.serverResponse;
            const symbol = tick.symbol;

            return state.map(v => {
                if (v.get('symbol') === symbol && v.get('isSold')) {
                    const existingTicks = v.get('ticks', fromJS([]));

                    const ticksAfterSold = existingTicks.filter(t => t.epoch >= v.get('isSold'));
                    const newTick = {
                        epoch: +tick.epoch,
                        quote: +tick.quote,
                    };
                    const noOfExtraTicksToShow = Math.max(3, existingTicks.size * 0.1);
                    return ticksAfterSold.size < noOfExtraTicksToShow ? v.set('ticks', existingTicks.push(newTick)) : v;
                }
                return v;
            });
        }
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const openContract = action.serverResponse.proposal_open_contract;
            if (Object.keys(openContract).length === 0) {
                return state;
            }

            const { contract_id, sell_spot_time, current_spot, current_spot_time } = openContract;

            // store the current tick anyway, and set isSold accordingly

            let newState = state;
            if (state.has(contract_id) && current_spot && current_spot_time) {
                const currentLastTickEpoch = state
                    .getIn([contract_id, 'ticks'])
                    .takeLast(1)
                    .getIn([0, 'epoch']);

                // ignore data older than we've got
                if (currentLastTickEpoch < current_spot_time) {
                    const newData = state
                        .getIn([contract_id, 'ticks'])
                        .push(fromJS({ epoch: +(current_spot_time), quote: +(current_spot) }));
                    newState = state.setIn([contract_id, 'ticks'], newData);
                }

                if (sell_spot_time) {
                    newState = newState.setIn([contract_id, 'isSold'], sell_spot_time);
                }

                return newState;
            }

            return state;
        }
        default: return state;
    }
};
