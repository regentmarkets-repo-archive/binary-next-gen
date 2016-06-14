import { fromJS } from 'immutable';
import { UPDATE_REALITY_CHECK } from '../_constants/ActionTypes';

const initialState = fromJS({
    interval: 10,
    acknowledged: false,
    showInitial: false,
    showSummary: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REALITY_CHECK: {
            return state.set(action.fieldName, action.fieldValue);
        }
        default: return state;
    }
};
