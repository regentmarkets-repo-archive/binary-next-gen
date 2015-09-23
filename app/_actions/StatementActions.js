import * as types from '../_constants/ActionTypes';

export function serverDataStatement(serverResponse) {
    return {
        type: types.SERVER_DATA_STATEMENT,
        serverResponse,
    };
}
