import { fromJS } from 'immutable';
import AppConfigReducer from '../AppConfigReducer';
import { UPDATE_APP_CONFIG } from '../../_constants/ActionTypes';
import expect from 'expect';

describe('AppConfigReducer',()=>{
  it('should update appconfig state with the given field and value',()=>{
    const action ={
      type: UPDATE_APP_CONFIG,
      field: 'language',
      value: 'FR',
    };
    const expectedState = fromJS({
        language: 'FR',
    });
    const actualState = AppConfigReducer(fromJS({}),action);
    expect(actualState).toEqual(expectedState);
  });

  it('should return the same appConfig state when wrong state type is given',()=>{
    const beforeState = fromJS({
        language: 'EN',
    });
    const action ={
      type: 'NON_EXISTING_TYPE',
      field: 'language',
      value: 'light',
    };
    const actualState = AppConfigReducer(beforeState,action);
    expect(actualState).toEqual(beforeState);
  })
});
