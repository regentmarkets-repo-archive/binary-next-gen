import { fromJS } from 'immutable';
import { UPDATE_CHART_DATA } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_DATA: {
            const { contractID, data } = action;
            return state.set(contractID, data);
        }
        default: return state;
    }
};
