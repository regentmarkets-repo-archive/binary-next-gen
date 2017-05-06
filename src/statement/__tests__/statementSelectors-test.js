import { fromJS } from 'immutable';
import statementSelectors from '../statementSelectors';

describe('statementSelectors', () => {
    const emptyState = () => ({
        account: fromJS([]),
        transactions: fromJS({}),
        views: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = statementSelectors(state);

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = statementSelectors(state);
        const second = statementSelectors(state);

        expect(first.currency).toEqual(second.currency);
        expect(first.transactions).toEqual(second.transactions);
        expect(first.tradingTimesFilter).toEqual(second.tradingTimesFilter);
        expect(first.transactionsTotal).toEqual(second.transactionsTotal);

        expect(first).toEqual(second);
    });
});
