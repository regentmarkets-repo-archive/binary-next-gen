import { fromJS } from 'immutable';
import { UPDATE_APP_CONFIG } from '../_constants/ActionTypes';

const initialState = fromJS({
    language: 'EN',
    theme: 'light',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP_CONFIG: {
            return state.set(action.field, action.value);
        }
        default: {
            return state;
        }
    }
};
