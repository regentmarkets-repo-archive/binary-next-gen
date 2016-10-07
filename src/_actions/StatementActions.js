import { api } from '../_data/LiveData';
import * as types from '../_constants/ActionTypes';

export const serverDataStatement = serverResponse => ({
    type: types.SERVER_DATA_STATEMENT,
    serverResponse,
});

export const serverTransactionStream = serverResponse =>
    (dispatch, getState) => {
        const { boughtContracts } = getState();

        const tx = serverResponse.transaction;
        if (tx && tx.action === 'buy') {
            const contract = boughtContracts.get(tx.contract_id);
            if (!contract) {
                api.subscribeToOpenContract(tx.contract_id);
            }
        }

        return dispatch({
            type: types.SERVER_DATA_TRANSACTION,
            serverResponse,
        });
    };
