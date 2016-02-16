import { fromJS } from 'immutable';
import {
    UPDATE_NEWS_LIST,
} from '../_constants/ActionTypes';


const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEWS_LIST: {
            return state.merge(action.articles);
        }
        default :
            return state;
    }
};
