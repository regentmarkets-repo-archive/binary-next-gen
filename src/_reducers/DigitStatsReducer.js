import { fromJS } from 'immutable';
import { UPDATE_DIGIT_STAT_FILTER } from '../_constants/ActionTypes';

const initialState = fromJS({ filter: 1000 });

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DIGIT_STAT_FILTER: return state.set('filter', action.filter);
        default: return state;
    }
};
