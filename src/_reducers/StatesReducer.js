import { Map } from 'immutable';
import { SERVER_DATA_STATES } from '../_constants/ActionTypes';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATES: {
            return state.set(action.country, action.states);
        }
        default: {
            return state;
        }
    }
};
