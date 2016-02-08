import { fromJS } from 'immutable';
import { CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_FIELD_UPDATE, CREATE_ACCOUNT_START } from '../_constants/ActionTypes';

const initialState = fromJS({
    step: 0,
    validatedOnce: false,
    residence: '',
    password: '',
    email: '',
    confirmPassword: '',
    progress: false,
    error: null,
    verificationCode: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ACCOUNT_START: {
            return state.set('progress', true);
        }
        case CREATE_ACCOUNT_FIELD_UPDATE: {
            return state.set(action.fieldName, action.fieldValue);
        }
        case CREATE_ACCOUNT_ERROR: {
            return state.set('error', action.error);
        }
        default: {
            return state;
        }
    }
};
