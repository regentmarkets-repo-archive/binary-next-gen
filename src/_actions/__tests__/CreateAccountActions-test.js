import * as types from '../../_constants/ActionTypes';
import {createAccountFieldUpdate,createAccountStart,createAccountFailed} from '../CreateAccountActions';
import expect from 'expect';

describe('CreateAccountActions',()=>{
  it('should update account field',()=>{
    const expectedAction ={
      type: types.CREATE_ACCOUNT_FIELD_UPDATE,
      fieldName: 'username',
      fieldValue: 'my username',
    };
    expect(createAccountFieldUpdate('username','my username')).toEqual(expectedAction);
  });

  it('should return createAccountStart type',()=>{
    const expectedAction= {
      type: types.CREATE_ACCOUNT_START,
    };
    expect(createAccountStart()).toEqual(expectedAction);
  });

  it('should throw error when createAccount fail',()=>{
    const expectedAction={
      type: types.CREATE_ACCOUNT_ERROR,
      error: 'Create account fails'
    };
    expect(createAccountFailed('Create account fails')).toEqual(expectedAction);
  });
});
