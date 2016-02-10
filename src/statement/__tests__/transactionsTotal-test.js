import { fromJS } from 'immutable';
import expect from 'expect';
import { transactionsTotalSelector } from '../statementSelectors';

describe('transactionsTotal', () => {
    it('should equal 0 when no contracts', () => {
        const actual = transactionsTotalSelector({
            transactions: fromJS([]),
            workspace: fromJS({}),
        });
        expect(actual).toEqual(0);
    });

    it('list of one item equals this item purchase price', () => {
        const actual = transactionsTotalSelector({
            transactions: fromJS([
                { amount: 10 },
            ]),
            workspace: fromJS({ transactionsFilter: 5 }),
        });
        expect(actual).toEqual(10);
    });

    it('list of multiple items results in sum of their prices', () => {
        const actual = transactionsTotalSelector({
            transactions: fromJS([
                { amount: 1 },
                { amount: 2 },
                { amount: 3 },
            ]),
            workspace: fromJS({ transactionsFilter: 5 }),
        });
        expect(actual).toEqual(6);
    });
});
