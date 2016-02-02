import expect from 'expect';
import * as types from '../../_constants/ActionTypes';
import {updateProposalById} from '../ProposalsActions';

describe('ProporsalsActions',()=>{
  it('should updateProposalById', ()=>{
    const expectedActions = {
      type: types.UPDATE_PROPOSAL_BY_ID,
      id: 2,
      proposal: 'New proposal',
    };
    expect(updateProposalById(2,'New proposal')).toEqual(expectedActions);
  });
});
