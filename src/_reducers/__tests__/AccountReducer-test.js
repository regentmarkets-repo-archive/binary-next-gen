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
    it('should be able to authorize data from the server',()=>{
        const response = {
            'msg_type': 'authorize',
            'authorize': {
                'currency': '',
                'fullname': 'Mr abc dfk',
                'loginid': 'MF2203',
            },
        };
        const beforeState = fromJS({});
        const stateExpected = fromJS({
            'currency': 'USD',
            'fullname': 'Mr abc dfk',
            'loginid': 'MF2203',
        });
        const action = {
            type: SERVER_DATA_AUTHORIZE,
            serverResponse: {
                authorize: response.authorize,
            },
        };
        const actualState = AccountReducer(beforeState,action);
        expect(actualState).toEqual(stateExpected);
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

        const beforeState = fromJS({});
        const actualState = AccountReducer(beforeState,action);
        const expectedState = fromJS({
            balance: 10,
        });
        expect(actualState).toEqual(expectedState);
    });

    it('should update balance after purchase', ()=>{
        const action = {
            type: SERVER_DATA_BUY,
            serverResponse: {
                balance_after: 30,
            },
        };
        const beforeState = fromJS({});
        const actualState = AccountReducer(beforeState,action);
        const expectedState = fromJS({
            account: { balance: 30},
        });
        expect(actualState).toEqual(expectedState);
    })
});