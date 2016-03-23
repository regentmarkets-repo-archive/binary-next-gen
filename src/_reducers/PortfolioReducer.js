import { fromJS } from 'immutable';

import {
    DETAILS_FOR_CONTRACT,
    UPDATE_NOW,
    REMOVE_PERSONAL_DATA,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    proposals: {},
    now: Math.floor(Date.now() / 1000),
    soldResultShown: undefined,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_FOR_CONTRACT: {
            return state
                .set('areDetailsShown', action.areDetailsShown)
                .set('contractShown', action.contractShown);
        }
        case UPDATE_NOW: {
            return state.set('now', action.now);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
