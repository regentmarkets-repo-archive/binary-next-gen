import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import { SERVER_DATA_STATES } from '../../_constants/ActionTypes';
import stateReducer from '../StatesReducer';

describe('statesReducer', () => {
    it('should be able to map each country with its respective states', () => {
        const action = {
            type: SERVER_DATA_STATES,
            country: 'COUNTRY',
            states: ['AY', 'WY'],
        };
        const beforeState = fromJS({});
        const expectedState = fromJS({ COUNTRY: ['AY', 'WY'] });

        const actualState = stateReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should return the default or initial state when action type is wrong or not given', () => {
        const action = {
            type: 'WRONG_ACTION_TYPE',
        };
        const beforeState = fromJS({});
        const actualState = stateReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
