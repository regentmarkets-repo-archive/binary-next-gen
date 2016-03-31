import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import contractsReducer from '../ContractsReducer';
import {
    SERVER_DATA_PORTFOLIO,
} from '../../_constants/ActionTypes';

describe('contractsReducer', () => {
    it('should be able to create new portfolio', () => {
        const action = {
            type: SERVER_DATA_PORTFOLIO,
            serverResponse: {
                portfolio: {
                    contracts: [{}],
                },
            },
        };
        const beforeState = fromJS([]);
        const expectedState = fromJS([{}]);

        const actualState = contractsReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should return the same state when given wrong actiontype', () => {
        const action = {
            type: 'NON_EXISTING_TYPE',
            serverResponse: {
                asset_index: 3,
            },
        };
        const beforeState = fromJS([]);
        const actualState = contractsReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
