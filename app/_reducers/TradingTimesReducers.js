import { Map } from 'immutable';

import {
    SERVER_DATA_TRADING_TIMES,
} from '../_constants/ActionTypes';

const initialState = new Map({
    markets: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TRADING_TIMES:
            const data = action.serverResponse.trading_times.markets;
            return state.set('markets', data);
        default:
            return state;
    }
};
