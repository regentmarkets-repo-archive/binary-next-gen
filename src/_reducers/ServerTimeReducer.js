import { fromJS } from 'immutable';
import { SERVER_DATA_TIME, UPDATE_SERVER_TIME } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default(state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TIME: {
            return state.set('time', action.serverResponse.time);
        }
        default: {
            return state;
        }
    }
};
