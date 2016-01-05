import { fromJS } from 'immutable';
import { SERVER_DATA_PROPOSAL } from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL: {
            const echo = action.serverResponse.echo_req;
            return state.setIn([echo.symbol, echo.contract_type], action.serverResponse.proposal);
        }
        default: {
            return state;
        }
    }
};
