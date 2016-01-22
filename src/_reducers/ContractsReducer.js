import { fromJS, List } from 'immutable';

import {
    SERVER_DATA_PORTFOLIO,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PORTFOLIO: {
            return state.merge(new List(action.serverResponse.portfolio.contracts));
        }
        default:
            return state;
    }
};
