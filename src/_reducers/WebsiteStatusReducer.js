import { fromJS } from 'immutable';
import {
    UPDATE_SUPPORTED_LANGUAGES
} from '../_constants/ActionTypes';

const initialState = fromJS({
    languages: [{
        value: 'EN',
        text: 'English',
    }],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUPPORTED_LANGUAGES: {
            return state.set('languages', action.languages);
        }
        default:
            return state;
    }
};
