import expect from 'expect';
import { transactionsTodaySelector } from '../TransactionsSelectors';

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
