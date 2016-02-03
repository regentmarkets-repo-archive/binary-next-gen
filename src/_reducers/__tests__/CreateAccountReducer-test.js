import { fromJS } from 'immutable';
import expect from 'expect';
import { CREATE_ACCOUNT_ERROR, CREATE_ACCOUNT_FIELD_UPDATE, CREATE_ACCOUNT_START } from '../../_constants/ActionTypes';
import CreateAccountReducer from '../CreateAccountReducer';

describe('CreateAccountReducer',()=>{
  it('should be able to CREATE_ACCOUNT_START',()=>{
    const initialState = fromJS({
        step: 0,
        validatedOnce: false,
        residence: '',
        password: '',
        email: '',
        confirmPassword: '',
        progress: false,
        error: null,
    });
    const expected  = fromJS({
      step: 0,
      validatedOnce: false,
      residence: '',
      password: '',
      email: '',
      confirmPassword: '',
      progress: true,
      error: null,
    });
    const action = {
      type: CREATE_ACCOUNT_START,
    };
    const actual = CreateAccountReducer(initialState,action);
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should be able to update account field', ()=>{
    const initialState = fromJS({
        step: 0,
        validatedOnce: false,
        residence: '',
        password: '',
        email: '',
        confirmPassword: '',
        progress: false,
        error: null,
    });
    const expected  = fromJS({
      step: 0,
      validatedOnce: false,
      residence: '',
      password: '',
      email: 'example@binary.com',
      confirmPassword: '',
      progress: false,
      error: null,
    });
    const action = {
      type: CREATE_ACCOUNT_FIELD_UPDATE,
      fieldName: 'email',
      fieldValue: 'example@binary.com'
    };
    const actual = CreateAccountReducer(initialState,action);
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should handle create account error',()=>{
    const initialState = fromJS({
        step: 0,
        validatedOnce: false,
        residence: '',
        password: '',
        email: '',
        confirmPassword: '',
        progress: false,
        error: null,
    });
    const expected  = fromJS({
      step: 0,
      validatedOnce: false,
      residence: '',
      password: '',
      email: '',
      confirmPassword: '',
      progress: false,
      error: 'Create account failed.',
    });
    const action = {
      type: CREATE_ACCOUNT_ERROR,
      error: 'Create account failed.',
    };
    const actual = CreateAccountReducer(initialState,action);
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should return default create account state when no type is provided',()=>{
    const initialState = fromJS({
        step: 0,
        validatedOnce: false,
        residence: '',
        password: '',
        email: '',
        confirmPassword: '',
        progress: false,
        error: null,
    });
    const expected = initialState;
    const action = {
      type: '',
      error: 'Create account failed.',
    };
    const actual = CreateAccountReducer(initialState,action);
    expect(actual.toJS()).toEqual(expected.toJS());
  })
});
