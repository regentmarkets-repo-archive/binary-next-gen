import { fromJS, List } from 'immutable';

import {
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    DETAILS_FOR_CONTRACT,
    UPDATE_NOW,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    detailsShown: false,
    contractShown: undefined,
    contracts: [],
    proposals: {},
    now: Math.floor(Date.now() / 1000),
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PORTFOLIO: {
            return state.set('contracts', new List(action.serverResponse.portfolio.contracts));
        }
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const proposal = action.serverResponse.proposal_open_contract;
            return state.setIn(['proposals', proposal.contract_id], proposal);
        }
        case DETAILS_FOR_CONTRACT: {
            return state
                .set('areDetailsShown', action.areDetailsShown)
                .set('contractShown', action.contractShown);
        }
        case UPDATE_NOW: {
            return state.set('now', Math.floor(Date.now() / 1000));
        }
        default:
            return state;
    }
};
