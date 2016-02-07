import expect from 'expect';
import { transactionsTodaySelector, transactionsTotalSelector } from '../TransactionsSelectors';

describe('TransactionsSelectors', () => {
    describe('transactionsToday', () => {
        it('should equal 0 when no contracts', () => {
            const actual = transactionsTodaySelector({
                transactions: [
                    { transaction_time: 123 },
                ],
            });
            expect(actual).toEqual([]);
        });
    });

    describe('transactionsTotal', () => {
        it('should equal 0 when no contracts', () => {
            const actual = transactionsTotalSelector({
                transactions: [],
            });
            expect(actual).toEqual(0);
        });

        it('list of one item equals this item purchase price', () => {
            const actual = transactionsTotalSelector({
                transactions: [
                    { amount: 10 },
                ],
            });
            expect(actual).toEqual(10);
        });

        it('list of multiple items results in sum of their prices', () => {
            const actual = transactionsTotalSelector({
                transactions: [
                    { amount: 1 },
                    { amount: 2 },
                    { amount: 3 },
                ],
            });
            expect(actual).toEqual(6);
        });
    });
});
