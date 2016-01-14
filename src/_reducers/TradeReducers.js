import { fromJS } from 'immutable';
import { UPDATE_TRADE_PARAMS } from '../_constants/ActionTypes';

const initialState = fromJS({
    1: {
        symbol: 'R_100',
        tradeCategory: 'callput',
        duration: 5,
        durationUnit: 'd',
        basis: 'payout',
        amount: 100,
    },
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADE_PARAMS: {
            return state.setIn([action.id, action.fieldName], action.fieldValue);
        }
        default: return state;
    }
};
