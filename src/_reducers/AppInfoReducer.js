import { fromJS } from 'immutable';
import { UPDATE_APP_INFO } from '../_constants/ActionTypes';

const initialState = fromJS({ authorized: false });

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP_INFO: {
            return state.set(action.field, action.value);
        }
        default: {
            return state;
        }
    }
};
