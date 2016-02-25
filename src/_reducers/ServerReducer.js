import { fromJS } from 'immutable';
import { SERVER_DATA_TIME } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default(state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_TIME: {
            const diff = action.serverResponse.time * 1000 - Date.now();
            return state.set('timeDiff', diff);
        }
        default: {
            return state;
        }
    }
};
