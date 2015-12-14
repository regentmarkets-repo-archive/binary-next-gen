import { fromJS } from 'immutable';
import { SIGNUP_FAILED, SIGNUP_FIELD_UPDATE, SIGNUP_START } from '../_constants/ActionTypes';

const initialState = fromJS({
    validatedOnce: false,
    residence: '',
    password: '',
    email: '',
    confirmPassword: '',
    progress: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_START: {
            return state.set('progress', true);
        }
        case SIGNUP_FIELD_UPDATE: {
            return state.set(action.fieldName, action.fieldValue);
        }
        case SIGNUP_FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
};
