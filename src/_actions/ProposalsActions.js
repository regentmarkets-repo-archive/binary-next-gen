import * as types from '../_constants/ActionTypes';

export const updateProposalById = (id, proposal) => ({
    type: types.UPDATE_PROPOSAL_BY_ID,
    id,
    proposal,
});
