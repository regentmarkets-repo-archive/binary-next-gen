import { fromJS } from 'immutable';
import { UPDATE_APP_STATE, SERVER_DATA_AUTHORIZE } from '../_constants/ActionTypes';

const initialState = fromJS({
    authorized: false,
    connected: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP_STATE: {
            return state.set(action.field, action.value);
        }
        case SERVER_DATA_AUTHORIZE: {
            return state.set('authorized', true);
        }
        default: {
            return state;
        }
    }
};
