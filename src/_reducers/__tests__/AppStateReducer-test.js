import { fromJS } from 'immutable';
import AppStateReducer from '../AppStateReducer';
import { UPDATE_APP_STATE } from '../../_constants/ActionTypes';
import expect from 'expect';

describe('AppStateReducer',()=>{
  it('should update appstate',()=>{
    const action ={
      type: UPDATE_APP_STATE,
      field: 'authorized',
      value: true,
    };
    const expected = fromJS({
        authorized: true,
        connected: false,
    });
    const actual =AppStateReducer(fromJS(),action);
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should return default appstate state',()=>{
    const initialState = fromJS({
        authorized: false,
        connected: false,
    });
    const action ={
      type: 'NON_EXISTING_TYPE',
      field: 'authorized',
      value: true,
    };
    const actual =AppStateReducer(fromJS(),action);
    expect(actual.toJS()).toEqual(initialState.toJS());
  })
});
