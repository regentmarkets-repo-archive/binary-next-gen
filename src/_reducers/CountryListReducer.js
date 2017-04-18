import { fromJS } from 'immutable';
import { SERVER_COUNTRY_LIST } from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_COUNTRY_LIST: {
            return state.merge(action.countries.residence_list);
        }
        default: {
            return state;
        }
    }
};
