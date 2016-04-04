import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import openContractProposalReducer from '../BoughtContractsReducer';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('openContractProposalsReducer', () => {
    it('should update open contract data proposal with the new contract proposal', () => {
        const action = {
            type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
            serverResponse: {
                proposal_open_contract: {
                     contract_id: '101010',
                 },
            },
        };
        const expectedState = fromJS({ '101010': { contract_id: '101010' } });
        const beforeState = fromJS({});
        const actualState = openContractProposalReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should update update contract portfolio state', () => {
        const action = {
            type: SERVER_DATA_PORTFOLIO,
            serverResponse: {
                portfolio: {
                    contracts: [
                        {
                            contract_id: '101',
                        },
                        {
                            contract_id: '202',
                        },
                    ],
                },
            },

        };
        const expectedState = fromJS({ '101': { contract_id: '101' }, '202': { contract_id: '202' } });
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
