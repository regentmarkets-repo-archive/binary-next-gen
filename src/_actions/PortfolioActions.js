import * as types from '../_constants/ActionTypes';
import { nowAsEpoch } from '../_utils/DateUtils';
import { sellExpiredContract } from './TradeActions';

export const serverDataPortfolio = serverResponse => ({
    type: types.SERVER_DATA_PORTFOLIO,
    serverResponse,
});

export const detailsForContract = (areDetailsShown, contractShown) => ({
    type: types.DETAILS_FOR_CONTRACT,
    areDetailsShown,
    contractShown,
});


export const serverDataProposalOpenContract = serverResponse => {
    if (!!serverResponse.proposal_open_contract.is_expired) {
        sellExpiredContract();
    }
    return { type: types.SERVER_DATA_PROPOSAL_OPEN_CONTRACT, serverResponse };
};

export const updateNow = () => ({
    type: types.UPDATE_NOW,
    now: nowAsEpoch(),
});

export const updateSoldContract = (contractId, soldPrice, transId) => ({
    type: types.UPDATE_SOLD_CONTRACT,
    contractId,
    soldPrice,
    transId,
});

export const closeSoldResult = () => ({
    type: types.CLOSE_SOLD_RESULT,
});
