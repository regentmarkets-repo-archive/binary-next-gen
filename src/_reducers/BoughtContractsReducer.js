import { fromJS } from 'immutable';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_TRANSACTION,
    REMOVE_PERSONAL_DATA,
    UPDATE_OPEN_CONTRACT_FIELD,
} from '../_constants/ActionTypes';

const initialState = fromJS({});

const convertOpenContract = openContract => {
    const cloned = Object.assign({}, openContract);

    // remove these two keys. we do not need them
    delete cloned.current_spot;
    delete cloned.current_spot_time;

    if (openContract.date_expiry) {
        cloned.date_expiry = +openContract.date_expiry;
    }

    if (openContract.date_start) {
        cloned.date_start = +openContract.date_start;
    }

    if (openContract.date_settlement) {
        cloned.date_settlement = +openContract.date_settlement;
    }

    return cloned;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            const contract = action.serverResponse.proposal_open_contract;
            if (Object.keys(contract).length === 0) {
                return state;
            }

            const openContract = convertOpenContract(contract);

            return state.set(openContract.contract_id, fromJS(openContract));
        }
        case SERVER_DATA_PORTFOLIO: {
            const contracts = action.serverResponse.portfolio.contracts;
            return contracts.reduce(
                (prev, curr) => prev.mergeIn([curr.contract_id], curr),
                state,
            );
        }
        case SERVER_DATA_TRANSACTION: {
            const tx = action.serverResponse.transaction;
            if (tx.action === 'sell') {
                return state
                    .mergeIn([tx.contract_id], {
                        sell_price: tx.amount,
                        sell_time: tx.transaction_time,
                    })
                    .mergeIn([tx.contract_id, 'transaction_ids'], {
                        sell: tx.transaction_id,
                    });
            }
            return state;
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
