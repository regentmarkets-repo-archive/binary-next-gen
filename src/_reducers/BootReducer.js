import { fromJS } from 'immutable';
import { UPDATE_BOOT, REMOVE_PERSONAL_DATA } from '../_constants/ActionTypes';

const initialState = fromJS({
    language: 'EN',
    theme: 'light',
    accounts: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BOOT: {
            return state.set(action.field, action.value);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
