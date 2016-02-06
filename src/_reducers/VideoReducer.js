import { fromJS } from 'immutable';
import { UPDATE_VIDEO_LIST } from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_VIDEO_LIST: {
            return state.merge(action.videos);
        }
        default : {
            return state;
        }
    }
};
