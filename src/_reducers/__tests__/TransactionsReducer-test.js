import { fromJS } from 'immutable';
import { expect } from 'chai';
import ransactionsReducer from '../TransactionsReducer';
import {
    SERVER_DATA_STATEMENT,
    REMOVE_PERSONAL_DATA,
} from '../../_constants/ActionTypes';

describe('transactionsReducer', () => {
    it('should be able to update statement data', () => {
        const action = {
            type: SERVER_DATA_STATEMENT,
            serverResponse: {
                statement: {
                    transactions: {
                        deposit: 100,
                    },
                },
            },
        };
        const beforeState = fromJS({});
        const actualState = ransactionsReducer(beforeState, action);
        const expectedState = fromJS({ deposit: 100 });
        expect(expectedState).to.equal(actualState);
    });

    it('should be able to clear transactional data', () => {
        const action = {
            type: REMOVE_PERSONAL_DATA,
        };
        const beforeState = fromJS([]);
        const actualState = ransactionsReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });

    it('should return transaction unchaned when action type is not provided', () => {
        const action = {
            serverResponse: {
                statement: {
                    transactions: {
                        deposit: 100,
                    },
                },
            },
        };
        const beforeState = fromJS({});
        const actualState = ransactionsReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
