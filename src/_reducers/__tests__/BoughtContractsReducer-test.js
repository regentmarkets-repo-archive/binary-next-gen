import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';
import openContractProposalReducer from '../BoughtContractsReducer';
import {
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    SERVER_DATA_PORTFOLIO,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

chai.use(chaiImmutable);

describe('openContractProposalsReducer', () => {
    describe('SERVER_DATA_PROPOSAL_OPEN_CONTRACT', () => {
        it('adds contract to an empty list', () => {
            const action = {
                type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
                serverResponse: {
                    proposal_open_contract: {
                        contract_id: '123',
                     },
                },
            };
            const beforeState = fromJS({});
            const expectedState = fromJS({
                123: {
                    contract_id: '123',
                },
            });
            const actualState = openContractProposalReducer(beforeState, action);

            expect(expectedState).to.equal(actualState);
        });
        it('adds contract if not yet existing', () => {
            const action = {
                type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
                serverResponse: {
                    proposal_open_contract: {
                        contract_id: '456',
                     },
                },
            };
            const beforeState = fromJS({
                123: {
                    contract_id: '123',
                },
            });
            const expectedState = fromJS({
                123: { contract_id: '123' },
                456: { contract_id: '456' },
            });
            const actualState = openContractProposalReducer(beforeState, action);

            expect(expectedState).to.equal(actualState);
        });
    });

    it('should update contract portfolio state', () => {
        const action = {
            type: SERVER_DATA_PORTFOLIO,
            serverResponse: {
                portfolio: {
                    contracts: [
                        { contract_id: '101' },
                        { contract_id: '202' },
                    ],
                },
            },

        };
        const expectedState = fromJS({
            101: { contract_id: '101' },
            202: { contract_id: '202' },
        });
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
