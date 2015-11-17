import { fromJS } from 'immutable';
import {
    SIGNIN_START,
    SIGNIN_FIELD_UPDATE,
    SIGNIN_FAILED,
    SERVER_DATA_AUTHORIZE,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    token: '',
    email: '',
    password: '',
    language: 'EN',
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
            // if (this.state.validatedOnce) this.validate();
            // if (action.fieldName === 'token') StateStorage.set('token', action.fieldValue);
            return state.set(action.fieldName, action.fieldValue);
        }
        case SIGNIN_FAILED: {
            return state.set('progress', false).set('credentialsInvalid', true);
        }
        case SERVER_DATA_AUTHORIZE: {
            return state.set('credentialsInvalid', action.serverResponse.error);
        }
        default:
            return state;
    }
};
