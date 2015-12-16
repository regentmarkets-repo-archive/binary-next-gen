import { fromJS } from 'immutable';
import {
    SIGNIN_START,
    SIGNIN_FIELD_UPDATE,
    SIGNIN_FAILED,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    email: '',
    password: '',
    tokenNotEntered: false,
    emailNotValid: false,
    passwordNotEntered: false,
    credentialsInvalid: false,
    validatedOnce: false,
    progress: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_START: {
            return state.set('progress', true);
        }
        case SIGNIN_FIELD_UPDATE: {
            return state.set(action.fieldName, action.fieldValue);
        }
        case SIGNIN_FAILED: {
            return state.set('progress', false).set('credentialsInvalid', true);
        }
        default:
            return state;
    }
};
