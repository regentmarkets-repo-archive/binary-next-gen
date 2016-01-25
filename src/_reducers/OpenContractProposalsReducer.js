import { fromJS } from 'immutable';

import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const proposal = action.serverResponse.proposal_open_contract;
            return state.set(proposal.contract_id, proposal);
        }
        default:
            return state;
    }
};
