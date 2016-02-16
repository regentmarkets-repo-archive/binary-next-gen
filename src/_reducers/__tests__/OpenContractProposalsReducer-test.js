import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import openContractProposalReducer from '../OpenContractProposalsReducer';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('OpenContractProposalsReducer', () => {
    it.skip('should update open contract data proposal with the new contract proposal', () => {
        const action = {
            type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
            serverResponse: {
                proposal_open_contract: {
                     contract_id: 0,
                 },
            },
        };
        const expectedState = fromJS({ 0: { contract_id: 0 } });
        const beforeState = fromJS({});
        const actualState = openContractProposalReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it.skip('should update update contract portfolio state', () => {
        const action = {
            type: SERVER_DATA_PORTFOLIO,
            serverResponse: {
                portfolio: {
                    contracts: [
                        {
                            contract_id: 0,
                        },
                        {
                            contract_id: 1,
                        },
                    ],
                },
            },

        };
        const expectedState = fromJS({ 0: { contract_id: 0 }, 1: { contract_id: 1 } });
        const beforeState = fromJS({});
        const actualState = openContractProposalReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should be able to remove personal data or discard contracts', () => {
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS({});
        const actualState = openContractProposalReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
