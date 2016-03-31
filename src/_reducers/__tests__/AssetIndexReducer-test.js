import { fromJS } from 'immutable';
import { expect } from 'chai';
import assetIndexReducer from '../AssetIndexReducer';
import {
    SERVER_DATA_ASSET_INDEX,
} from '../../_constants/ActionTypes';

describe('assetIndexReducer', () => {
    it('should update asset index', () => {
        const action = {
            type: SERVER_DATA_ASSET_INDEX,
            serverResponse: {
                asset_index: [3],
            },
        };
        const beforeState = fromJS([]);
        const stateExpectedAfter = fromJS([3]);
        const actual = assetIndexReducer(beforeState, action);
        expect(actual).to.equal(stateExpectedAfter);
    });

    it('should return the same state when given wrong actiontype', () => {
        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const expected = fromJS([]);
        const beforeState = fromJS();
        const actualState = assetIndexReducer(beforeState, action);

        expect(expected).to.equal(actualState);
    });
});
