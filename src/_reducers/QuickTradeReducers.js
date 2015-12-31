import { fromJS } from 'immutable';
import { UPDATE_QUICK_TRADE_PARAMS } from '../_constants/ActionTypes';

const initialState = fromJS({});        // symbol: {purchase info...}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUICK_TRADE_PARAMS: {
            return state.mergeIn([action.symbol, action.tradeType], action.params);
        }
        default: {
            return state;
        }
    }
};
