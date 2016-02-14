import { fromJS } from 'immutable';
import accountReducer from '../AccountReducer';
import { expect } from 'chai';
import {
    SERVER_DATA_AUTHORIZE,
    SERVER_DATA_BALANCE,
    SERVER_DATA_BUY,
} from '../../_constants/ActionTypes';


describe('accountReducer', () => {
    it('should be able to authorize data from the server', () => {
        const response = {
            msg_type: 'authorize',
            authorize: {
                currency: '',
                fullname: 'Mr abc dfk',
                loginid: 'MF2203',
            },
        };
        const beforeState = fromJS({});
        const stateExpected = fromJS({
            currency: 'USD',
            fullname: 'Mr abc dfk',
            loginid: 'MF2203',
        });
        const action = {
            type: SERVER_DATA_AUTHORIZE,
            serverResponse: {
                authorize: response.authorize,
            },
        };
        const actualState = accountReducer(beforeState, action);
        expect(actualState).to.equal(stateExpected);
    });

    it('should update balance with the response balance ', () => {
        const action = {
            type: SERVER_DATA_BALANCE,
            serverResponse: {
                balance: {
                    balance: 10,
                },
            },
        };

        const beforeState = fromJS({});
        const actualState = accountReducer(beforeState, action);
        const expectedState = fromJS({
            balance: 10,
        });
        expect(expectedState).to.equal(actualState);
    });

    it('should update balance after purchase', () => {
        const action = {
            type: SERVER_DATA_BUY,
            serverResponse: {
                balance_after: 30,
            },
        };
        const beforeState = fromJS({});
        const actualState = accountReducer(beforeState, action);
        const expectedState = fromJS({
            account: { balance: 30 },
        });
        expect(expectedState).to.equal(actualState);
    });
});
