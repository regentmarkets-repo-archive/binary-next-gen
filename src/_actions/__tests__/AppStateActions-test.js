import { UPDATE_APP_STATE } from '../../_constants/ActionTypes';
import {updateAppState} from '../AppStateActions';
import expect from 'expect';

describe('AppStateActions',()=>{
  it('should be equal to the expectedAction',()=>{
      const expectedAction = {
        type: UPDATE_APP_STATE,
        field: 'checkbox',
        value: true,
      };
      expect(updateAppState('checkbox',true)).toEqual(expectedAction);
  });
});
