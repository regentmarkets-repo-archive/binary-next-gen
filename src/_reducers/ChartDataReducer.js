import { fromJS, List } from 'immutable';
import { UPDATE_CHART_DATA_BY_CONTRACT, SERVER_DATA_TICK_STREAM } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHART_DATA_BY_CONTRACT: {
            const { contractID, data } = action;
            return state.set(contractID, data);
        }
        default: return state;
    }
};
