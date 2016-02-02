import * as types from '../../_constants/ActionTypes';
import {signinStart,signinFieldUpdate} from '../SigninActions';
import expect from 'expect';

describe('SigninActions',()=>{
  it("should return signinStart's type",()=>{
    console.log("The log ", signinStart());
    expect(signinStart().type).toEqual(types.SIGNIN_START);
  });

  it('should update signin field', ()=>{
    const expectedActions= {
      type: types.SIGNIN_FIELD_UPDATE,
      fieldName: 'username',
      fieldValue: 'Nuru',
    };
    expect(signinFieldUpdate('username','Nuru')).toEqual(expectedActions);
  });
});
