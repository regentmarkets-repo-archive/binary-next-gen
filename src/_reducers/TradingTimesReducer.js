import { fromJS } from 'immutable';
import {
    SERVER_DATA_TRADING_TIMES,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

const flattenTradingTimes = tradingTimes =>
    tradingTimes.markets
        .reduce((x, y) => x.concat(y.submarkets), [])
        .reduce((x, y) => x.concat(y.symbols), []);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TRADING_TIMES: {
            const flatTimes = flattenTradingTimes(action.serverResponse.trading_times);
            return state.merge(flatTimes);
        }
        default:
            return state;
    }
};
