import { api } from '../_data/LiveData';
import * as types from '../_constants/ActionTypes';

export const serverDataStatement = serverResponse => ({
    type: types.SERVER_DATA_STATEMENT,
    serverResponse,
});

export const serverTransactionStream = serverResponse => dispatch => {
    const tx = serverResponse.transaction;
    if (tx && tx.action === 'buy') {
        api.subscribeToOpenContract(tx.contract_id);
    }

    return dispatch({
        type: types.SERVER_DATA_TRANSACTION,
        serverResponse,
    });
};
