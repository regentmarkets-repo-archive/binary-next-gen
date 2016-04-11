import { fromJS } from 'immutable';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_TRANSACTION,
    REMOVE_PERSONAL_DATA,
    UPDATE_OPEN_CONTRACT_FIELD,
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
            return contracts
                .reduce((prev, curr) => prev.mergeIn([curr.contract_id], curr), state);
        }
        case SERVER_DATA_TRANSACTION: {
            const tx = action.serverResponse.transaction;
            if (tx.action !== 'sell') {
                return state.mergeIn([tx.contract_id], { transaction_id: tx.transaction_id });
            }
            return state.mergeIn([tx.contract_id], {
                sell_price: tx.amount,
                sell_time: tx.transaction_time,
            });
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        case UPDATE_OPEN_CONTRACT_FIELD: {
            const field = action.openContractField;
            return state.mergeIn([field.id], field);
        }
        default:
            return state;
    }
};
