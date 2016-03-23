import { fromJS } from 'immutable';

import {
    SERVER_DATA_STATEMENT,
    SERVER_DATA_TRANSACTION,
    REMOVE_PERSONAL_DATA,
} from '../_constants/ActionTypes';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_STATEMENT: {
            return state.merge(action.serverResponse.statement.transactions);
        }
        case SERVER_DATA_TRANSACTION: {
            const rawTx = action.serverResponse.transaction;

            // short code is missing, but we do not need it
            const txWithoutExtraProps = {
                balance_after: rawTx.balance,
                action_type: rawTx.action,
                transaction_id: rawTx.transaction_id,
                contract_id: rawTx.contract_id,
                transaction_time: rawTx.transaction_time,
                purchase_time: rawTx.purchase_time,
                amount: rawTx.amount,
                longcode: rawTx.longcode,
            };
            return state.unshift(fromJS(txWithoutExtraProps));
        }
        case REMOVE_PERSONAL_DATA: {
            return initialState;
        }
        default:
            return state;
    }
};
