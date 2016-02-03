import { fromJS } from 'immutable';
import AccountReducer from '../AccountReducer';
import expect from 'expect';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_PAYOUT_CURRENCIES,
    SERVER_DATA_BUY,
    UPDATE_TOKEN,
} from '../../_constants/ActionTypes';


describe('AccountReducer',()=>{
  it('should be able to authorize data',()=>{
    const response = {
         'msg_type': 'authorize',
         'authorize': {
           'currency': '',
           'balance': 0,
           'fullname': 'Mr abc dfk',
           'loginid': 'MF2203',
         },
    };
    const initialState = fromJS({
        loginid: 'MF2203',
        fullname: 'Mr abc dfk',
        currency: 'USD',
        balance: 0,
        token: '',
        currencies: ['USD'],
    });
    const action = {
      type: SERVER_DATA_AUTHORIZE,
      serverResponse: {
        authorize: response.authorize,
      },
    };
    const stateBefore = fromJS();
    const actual = AccountReducer(stateBefore,action);
    const expected = initialState;
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should update balance with the response balance ',()=>{
    const action = {
      type: SERVER_DATA_BALANCE,
      serverResponse: {
        balance: {
          balance: 10
        },
      },
    };

    const stateBefore = fromJS();
    const actual = AccountReducer(stateBefore,action);
    const expected = fromJS({
        loginid: '',
        fullname: '',
        currency: 'USD',
        balance: 10,
        token: '',
        currencies: ['USD'],
    });
    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('should update balance after purchase', ()=>{
    const action = {
      type: SERVER_DATA_BUY,
      serverResponse: {
        balance_after: 30,
      },
    };
    const stateBefore = fromJS();
    const actual = AccountReducer(stateBefore,action);
    const expected = fromJS({
        loginid: '',
        account: { balance: 30},
        fullname: '',
        currency: 'USD',
        balance: 0,
        token: '',
        currencies: ['USD'],
    });
    expect(actual.toJS()).toEqual(expected.toJS());
  })
});
