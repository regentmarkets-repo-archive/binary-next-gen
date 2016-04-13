import { fromJS } from 'immutable';
import { UPDATE_BOOT } from '../_constants/ActionTypes';

const initialState = fromJS({
    language: 'EN',
    theme: 'light',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BOOT: {
            return state.set(action.field, action.value);
        }
        default: {
            return state;
        }
    }
};
