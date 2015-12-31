import { fromJS } from 'immutable';
import { SERVER_DATA_PROPOSAL } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL: {
            return state.set(action.serverResponse.echo_req.symbol, action.serverResponse.proposal);
        }
        default: {
            return state;
        }
    }
};
