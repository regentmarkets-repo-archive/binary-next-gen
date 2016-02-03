import { fromJS } from 'immutable';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    REMOVE_PERSONAL_DATA,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const proposal = action.serverResponse.proposal_open_contract;
            if (Object.keys(proposal).length === 0) {
                return initialState;
            }
            return state.mergeIn([proposal.contract_id], proposal);
        }
        case SERVER_DATA_PORTFOLIO: {
            const contracts = action.serverResponse.portfolio.contracts;
            const mergeAll = contracts.reduce((prev, curr) => prev.mergeIn([curr.contract_id], curr), state);
            return mergeAll;
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
