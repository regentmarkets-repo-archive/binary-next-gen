import { fromJS } from 'immutable';
import { UPDATE_TRADING_OPTIONS } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRADING_OPTIONS: {
            return state.set(action.symbol, action.options);
        }
        default: {
            return state;
        }
    }
};
