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
            const { contractID, data, dataType, symbol } = action;
            const existing = state.hasIn([contractID, dataType]) ? state.getIn([contractID, dataType]) : [];
            const merged = mergeTicks(existing, data);

            if (merged.length === existing.length) {
                return state;
            }
            return state
                .setIn([contractID, dataType], fromJS(merged))
                .setIn([contractID, 'symbol'], symbol);
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
                if (v.get('symbol') === symbol) {
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

            if (state.has(openContract.contract_id)) {
                if (!openContract.sell_time && openContract.current_spot && openContract.current_spot_time) {
                    const latestData = state
                        .getIn([openContract.contract_id, 'ticks'])
                        .slice(0)
                        .push({ epoch: +(openContract.current_spot_time), quote: +(openContract.current_spot) });
                    return state.setIn([openContract.contract_id, 'ticks'], fromJS(latestData));
                }
            }
            return state;
        }
        default: return state;
    }
};
