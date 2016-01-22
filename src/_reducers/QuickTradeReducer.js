import { fromJS } from 'immutable';
import { UPDATE_QUICK_TRADE_PARAMS, SET_QUICK_TRADE_FIELD } from '../_constants/ActionTypes';

const initialState = fromJS({});        // symbol: {purchase info...}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUICK_TRADE_PARAMS: {
            return state.mergeIn([action.symbol, action.tradeType, 'params'], action.params);
        }
        case SET_QUICK_TRADE_FIELD: {
            return state.setIn([action.symbol, action.tradeType, action.field], action.value);
        }
        default: {
            return state;
        }
    }
};
