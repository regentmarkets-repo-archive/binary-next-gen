import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import proposalsReducer from '../ProposalsReducer';
import { SERVER_DATA_PROPOSAL } from '../../_constants/ActionTypes';

describe('proposalsReducer', () => {
    it('should be able to update proposal data with the newly provided server data', () => {
        const beforeState = fromJS({});
        const action = {
            type: SERVER_DATA_PROPOSAL,
            serverResponse: {
                echo_req: {
                    contract_type: 'Call',
                    symbol: 'R_100',
                },
                proposal: 1,
            },
        };
        const expectedState = fromJS({
            R_100: {
                Call: 1,
            },
        });
        const actualState = proposalsReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it('should return thesame propsal state when proposal type is not provided', () => {
        const beforeState = fromJS({});
        const action = {
            proposal: 1,
        };
        const actualState = proposalsReducer(beforeState, action);

        expect(actualState).to.equal(beforeState);
    });
});
