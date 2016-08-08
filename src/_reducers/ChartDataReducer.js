import { fromJS } from 'immutable';
import {
    UPDATE_CHART_DATA_BY_CONTRACT,
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_OHLC_STREAM,
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
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const openContract = action.serverResponse.proposal_open_contract;
            if (Object.keys(openContract).length === 0) {
                return state;
            }

            const { contract_id, sell_time, current_spot, current_spot_time } = openContract;

            if (state.has(contract_id)) {
                if (!sell_time && current_spot && current_spot_time) {
                    const currentLastTickEpoch = state
                        .getIn([contract_id, 'ticks'])
                        .takeLast(1)
                        .getIn([0, 'epoch']);

                    if (currentLastTickEpoch > current_spot_time) {
                        return state;
                    }

                    const latestData = state
                        .getIn([contract_id, 'ticks'])
                        .slice(0)
                        .push({ epoch: +(current_spot_time), quote: +(current_spot) });

                    return state.setIn([contract_id, 'ticks'], fromJS(latestData));
                }

                if (sell_time) {
                  return state.setIn([contract_id, 'isSold'], true);
                }

                return state;
            }

            return state;
        }
        default: return state;
    }
};
