import { fromJS, List } from 'immutable';

import {
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    DETAILS_FOR_CONTRACT,
    UPDATE_NOW,
    UPDATE_SOLD_CONTRACT,
    CLOSE_SOLD_RESULT,
} from '../_constants/ActionTypes';

const initialState = fromJS({
    detailsShown: false,
    contractShown: undefined,
    contracts: [],
    proposals: {},
    now: Math.floor(Date.now() / 1000),
    soldResultShown: undefined,
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
        default:
            return state;
    }
};
