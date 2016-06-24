import { fromJS } from 'immutable';
import { SERVER_DATA_STATES } from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATES: {
            return fromJS(action.states);
        }
        default: {
            return state;
        }
    }
};
