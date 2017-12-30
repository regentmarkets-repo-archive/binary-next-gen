import { api } from '../_data/LiveData';
import * as types from '../_constants/ActionTypes';

export const serverDataStatement = serverResponse => ({
    type: types.SERVER_DATA_STATEMENT,
    serverResponse,
});

export const serverTransactionStream = serverResponse =>
    (dispatch) => {
        const tx = serverResponse.transaction;

        // Ignore the response of it doesn't contain action;
        // This can occur if when transaction API is first called
        // or subsequent times when websocket disconnects.
        if (!tx || (tx && !tx.action)) {
            return undefined;
        }

        if (tx && tx.action === 'buy') {
            api.subscribeToOpenContract(tx.contract_id);
        }

        return dispatch({
            type: types.SERVER_DATA_TRANSACTION,
            serverResponse,
        });
    };
