import { fromJS } from 'immutable';
import { UPDATE_APP_STATE } from '../_constants/ActionTypes';

const initialState = fromJS({
    authorized: false,
    connected: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP_STATE: {
            return state.set(action.field, action.value);
        }
        default: {
            return state;
        }
    }
};
