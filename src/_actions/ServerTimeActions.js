import * as types from '../_constants/ActionTypes';


export const serverDataTime = serverResponse => ({
    type: types.SERVER_DATA_TIME,
          serverResponse,
});
