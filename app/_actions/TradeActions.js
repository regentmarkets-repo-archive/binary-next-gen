import * as types from '../_constants/ActionTypes';

export const serverDataProposal = (serverResponse) => ({
    type: types.SERVER_DATA_PROPOSAL,
    serverResponse,
});

export const updateTickTradeParameters = (parameters) => ({
    type: types.UPDATE_TICK_TRADE_PARAMETERS,
    parameters,
});

export const serverDataBuy = (serverResponse) => ({
    type: types.SERVER_DATA_BUY,
    serverResponse,
});
