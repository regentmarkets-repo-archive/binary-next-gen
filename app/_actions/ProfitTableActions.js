import * as types from '../_constants/ActionTypes';

export function serverDataProfitTable(serverResponse) {
    return {
        type: types.SERVER_DATA_PROFIT_TABLE,
        serverResponse,
    };
}
