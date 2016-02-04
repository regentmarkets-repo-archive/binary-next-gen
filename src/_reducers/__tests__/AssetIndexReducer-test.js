import { fromJS } from 'immutable';
import expect from 'expect';
import AssetIndexReducer from '../AssetIndexReducer';
import {
    SERVER_DATA_ASSET_INDEX,
} from '../../_constants/ActionTypes';

const initialState = fromJS([]);

describe('AssetIndexReducer',()=>{
    it('should update asset index',()=>{
        const action = {
            type: SERVER_DATA_ASSET_INDEX,
            serverResponse: {
                asset_index: [3],
            },
        };
        const beforeState = fromJS([]);
        const stateExpectedAfter = fromJS([3]);
        const actual = AssetIndexReducer(beforeState,action);
        expect(actual).toEqual(stateExpectedAfter);
    });

    it('should return the same state when given wrong actiontype',()=>{
        const action = {
            type: 'NON_EXISTING_TYPE',
        };
        const arr = [];
        const beforeState = fromJS();
        const actualState = AssetIndexReducer(beforeState,action);
        expect(actualState.toJS()).toEqual(fromJS(arr).toJS());
    });
});