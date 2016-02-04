import { fromJS } from 'immutable';
import expect from 'expect';
import { CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_FIELD_UPDATE, CREATE_ACCOUNT_START } from '../../_constants/ActionTypes';
import CreateAccountReducer from '../CreateAccountReducer';

describe('CreateAccountReducer',()=>{
  it('should be able to CREATE_ACCOUNT_START',()=>{
    const beforeState = fromJS({
        progress: false,
    });
    const expectedState  = fromJS({
      progress: true,
    });
    const action = {
      type: CREATE_ACCOUNT_START,
    };
    const actualState = CreateAccountReducer(beforeState,action);
    expect(actualState).toEqual(expectedState);
  });

  it('should be able to update account field', ()=>{
    const beforeState = fromJS({});
    const expectedState  = fromJS({
      email: 'example@binary.com',
    });
    const action = {
      type: CREATE_ACCOUNT_FIELD_UPDATE,
      fieldName: 'email',
      fieldValue: 'example@binary.com'
    };
    const actualState = CreateAccountReducer(beforeState,action);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle create account error',()=>{
    const stateBefore = fromJS({});
    const expectedState  = fromJS({
      error: 'Create account failed.',
    });
    const action = {
      type: CREATE_ACCOUNT_ERROR,
      error: 'Create account failed.',
    };
    const actualState = CreateAccountReducer(stateBefore,action);
    expect(actualState).toEqual(expectedState);
  });

  it('should return the same create account state when no type is provided',()=>{
    const beforeState = fromJS({
        type: '',
        error: 'Create account failed.',
    });
    const action = {
      type: '',
      error: 'Create account failed.',
    };
    const actualState = CreateAccountReducer(beforeState,action);
    expect(actualState).toEqual(beforeState);
  })
});
