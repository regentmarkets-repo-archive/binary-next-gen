import { fromJS } from 'immutable';
import AppConfigReducer from '../AppConfigReducer';
import { UPDATE_APP_CONFIG } from '../../_constants/ActionTypes';
import expect from 'expect';

describe('AppConfigReducer',()=>{
  it('should update appconfig',()=>{
    const action ={
      type: UPDATE_APP_CONFIG,
      field: 'language',
      value: 'FR',
    };
    const expected = fromJS({
        language: 'FR',
        theme: 'light',
    });
    const actual =AppConfigReducer(fromJS(),action);
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should return default AppConfig state',()=>{
    const initialState = fromJS({
        language: 'EN',
        theme: 'light',
    });
    const action ={
      type: 'NON_EXISTING_TYPE',
      field: 'language',
      value: 'light',
    };
    const actual =AppConfigReducer(fromJS(),action);
    expect(actual.toJS()).toEqual(initialState.toJS());
  })
});
