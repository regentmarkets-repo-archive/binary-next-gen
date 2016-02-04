import { fromJS } from 'immutable';
import OpenContractProposal from '../OpenContractProposalsReducer';
import expect from 'expect';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('OpenContractProposalsReducer',()=>{
    it('should update open contract data proposal with the new contract proposal',()=>{
        const action = {
            type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
            serverResponse: {
                proposal_open_contract:{
                     contract_id: 0 ,
                 }
                ,
            },
        };
        const expectedState = fromJS({ 0: { contract_id: 0 } });
        const beforeState = fromJS({});
        const actualState = OpenContractProposal(beforeState,action);
        expect(actualState.toJS()).toEqual(expectedState.toJS());
    });

    it('should update update contract portfolio state',()=>{
        const action={
            type: SERVER_DATA_PORTFOLIO,
            serverResponse: {
                portfolio: {
                    contracts: [
                        {
                            contract_id: 0,
                        },
                        {
                            contract_id: 1,
                        }
                    ],
                },
            },

        };
        const expectedState = fromJS({0: {contract_id: 0,}, 1: {contract_id: 1}});
        const beforeState = fromJS({});
        const actualState = OpenContractProposal(beforeState,action);
        expect(actualState.toJS()).toEqual(expectedState.toJS());
    });

    it('should be able to remove personal data or discard contracts',()=>{
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS({});
        const actualState = OpenContractProposal(beforeState,action);
        expect(actualState).toEqual(beforeState);
    });
});