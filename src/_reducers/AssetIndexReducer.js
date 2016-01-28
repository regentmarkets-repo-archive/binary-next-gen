import { fromJS } from 'immutable';
import {
    SERVER_DATA_ASSET_INDEX,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_ASSET_INDEX: {
            return state.merge(action.serverResponse.asset_index);
        }
        default:
            return state;
    }
};
