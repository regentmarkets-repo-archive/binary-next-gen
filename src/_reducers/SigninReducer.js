import { fromJS } from 'immutable';
import {
    SIGNIN_START,
    SIGNIN_FIELD_UPDATE,
    UPDATE_TOKEN,
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
        case UPDATE_TOKEN: {
            if (action.token) {
                return state.set('tokenNotEntered', false);
            }
            return state.set('tokenNotEntered', true);
        }
        default:
            return state;
    }
};
