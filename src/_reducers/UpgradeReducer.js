import { fromJS } from 'immutable';
import { UPGRADE_FIELD_UPDATE, UPGRADE_DOB_UPDATE, UPGRADE_FIELD_CLEAR } from '../_constants/ActionTypes';

const initialState = fromJS({
    activeStep: 0,
    progress: false,
    salutation: 'Mr',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    residence: '',
    addressLine1: '',
    addressLine2: '',
    addressCity: '',
    addressState: '',
    addressPostcode: '',
    phone: '',
    secretQuestion: '',
    secretAnswer: '',
    success: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPGRADE_FIELD_UPDATE: {
            return state.set(action.fieldName, action.fieldValue);
        }
        case UPGRADE_DOB_UPDATE: {
            const date = state.get('dateOfBirth');
            switch (action.dayMonthOrYear) {
                case 'day': {
                    date.setDate(action.val);
                    break;
                }
                case 'month': {
                    date.setMonth(action.val);
                    break;
                }
                case 'year': {
                    date.setFullYear(action.val);
                    break;
                }
                default:
            }
            return state.set('dateOfBirth', date);
        }
        case UPGRADE_FIELD_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
