import { fromJS } from 'immutable';
import accountReducer from '../AccountReducer';
import { expect } from 'chai';
import { SERVER_DATA_AUTHORIZE, SERVER_DATA_BALANCE, SERVER_DATA_BUY } from '../../_constants/ActionTypes';

describe('accountReducer', () => {
    it('updates data when authorize response is received', () => {
        const action = {
            type: SERVER_DATA_AUTHORIZE,
            serverResponse: {
                authorize: {
                    currency: 'GBP',
                    fullname: 'Mr abc dfk',
                    loginid: 'MF2203',
                },
            },
        };
        const beforeState = fromJS({});
        const stateExpected = fromJS({
            currency: 'GBP',
            fullname: 'Mr abc dfk',
            loginid: 'MF2203',
        });

        const actualState = accountReducer(beforeState, action);
        expect(actualState).to.equal(stateExpected);
    });

    it('when no currency is returned, defaults to USD', () => {
        const action = {
            type: SERVER_DATA_AUTHORIZE,
            serverResponse: {
                authorize: {
                    currency: '',
                },
            },
        };
        const beforeState = fromJS({});
        const stateExpected = fromJS({
            currency: 'USD',
        });

        const actualState = accountReducer(beforeState, action);
        expect(actualState).to.equal(stateExpected);
    });

    it('updates balance on server update', () => {
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

    it('updates balance after purchase', () => {
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
