import { fromJS } from 'immutable';
import {
    UPDATE_SYMBOL_FEED_LICENSE,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SYMBOL_FEED_LICENSE: {
            if (state.has(action.symbol)) {
                return state;
            }
            return state.set(action.symbol, action.license);
        }
        default: return state;
    }
};
