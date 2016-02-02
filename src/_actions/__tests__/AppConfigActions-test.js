import { UPDATE_APP_CONFIG } from '../../_constants/ActionTypes';
import {updateAppConfig} from '../AppConfigActions';
import expect from 'expect';

describe('AppConfigActions',()=>{
  it('should be equal to the expectedAction',()=>{
      const expectedAction = {
        type: UPDATE_APP_CONFIG,
        field: 'balance',
        value: 3,
      };
      expect(updateAppConfig('balance',3)).toEqual(expectedAction);
  });
});
