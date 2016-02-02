import expect from 'expect';
import {serverDataStatement} from '../StatementActions';
import * as types from '../../_constants/ActionTypes';

describe('StatementActions', ()=>{
  it('should return serverDataStatement',()=>{
    const response = {
      'msg_type': 'authorize',
      'authorize': {
        'currency': '',
        'email': 'negar+client02@binary.com',
        'balance': 0,
        'fullname': 'Mr abc dfk',
        'loginid': 'MF2203',
      },
    };
    const expectedAction = {
      type: types.SERVER_DATA_STATEMENT,
      serverResponse: response,
    };
    expect(serverDataStatement(response)).toEqual(expectedAction);
  });
});
