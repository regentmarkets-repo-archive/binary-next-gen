import { fromJS } from 'immutable';
import expect from 'expect';
import ContractsReducer from '../ContractsReducer';
import {
    SERVER_DATA_PORTFOLIO,
} from '../../_constants/ActionTypes';

const initialState = fromJS([]);

describe('ContractsReducer',()=>{
  it('should be able to create new portfolio',()=>{
    const action = {
      type: SERVER_DATA_PORTFOLIO,
      serverResponse: {
        portfolio: {
          contracts: [{PurchaseInfo: 'Info',Value : 3,}],
        },
      },
    };
    const beforeState = fromJS([]);
    const expectedState = fromJS([{PurchaseInfo: 'Info',Value : 3,}]);
    const actualState = ContractsReducer(beforeState,action);
    expect(actualState.toJS()).toEqual(expectedState.toJS());
  });

  it('should return the same state when given wrong actiontype',()=>{
    const action = {
      type: 'NON_EXISTING_TYPE',
      serverResponse: {
        asset_index: 3,
      },
    };
    const beforeState = fromJS([]);
    const actualState = ContractsReducer(beforeState,action);
    expect(actualState).toEqual(beforeState);
  });
});
