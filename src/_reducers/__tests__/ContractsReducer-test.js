import { fromJS } from 'immutable';
import expect from 'expect';
import contractsReducer from '../ContractsReducer';
import {
    SERVER_DATA_PORTFOLIO,
} from '../../_constants/ActionTypes';

describe('ContractsReducer', () => {
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
        expect(actualState.toJS()).toEqual(expectedState.toJS());
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
        expect(actualState).toEqual(beforeState);
    });
});
