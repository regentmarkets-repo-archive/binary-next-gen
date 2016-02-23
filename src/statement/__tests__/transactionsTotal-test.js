import { fromJS } from 'immutable';
import { expect } from 'chai';
import { transactionsTotalSelector } from '../statementSelectors';

describe('transactionsTotal', () => {
    it('should equal 0 when no contracts', () => {
        const actual = transactionsTotalSelector({
            transactions: fromJS([]),
            views: fromJS({}),
        });
        expect(actual).to.equal(0);
    });

    it('list of one item equals this item purchase price', () => {
        const state = {
            transactions: fromJS([
                { amount: 10 },
            ]),
            views: fromJS({ transactionsFilter: 4 }), // do not filter
        };
        const actual = transactionsTotalSelector(state);
        expect(actual).to.equal(10);
    });

    it('list of multiple items results in sum of their prices', () => {
        const state = {
            transactions: fromJS([
                { amount: 1 },
                { amount: 2 },
                { amount: 3 },
            ]),
            views: fromJS({ transactionsFilter: 4 }), // do not filter
        };
        const actual = transactionsTotalSelector(state);
        expect(actual).to.equal(6);
    });
});
