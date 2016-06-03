import { fromJS } from 'immutable';

import {
    SERVER_DATA_CANDLES,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_CANDLES: {
            const granularity = action.serverResponse.echo_req.granularity;
            if (granularity !== 86400) {
                return state;
            }
            const symbol = action.serverResponse.echo_req.ticks_history;
            const ohlc = fromJS(action.serverResponse.candles);

            return state.set(symbol, ohlc);
        }
        default:
            return state;
    }
};
