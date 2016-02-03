import { fromJS } from 'immutable';

import {
    DETAILS_FOR_CONTRACT,
    UPDATE_NOW,
    UPDATE_SOLD_CONTRACT,
    CLOSE_SOLD_RESULT,
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
        case UPDATE_SOLD_CONTRACT: {
            return state.set('soldResultShown', {
                contractId: action.contractId,
                soldPrice: action.soldPrice,
                transId: action.transId,
            });
        }
        case CLOSE_SOLD_RESULT: {
            return state.set('soldResultShown', undefined);
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
