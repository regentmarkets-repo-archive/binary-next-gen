import { fromJS } from 'immutable';
import { expect } from 'chai';
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

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = statementSelectors(state);
        const second = statementSelectors(state);

        expect(first.currency).to.equal(second.currency);
        expect(first.transactions).to.equal(second.transactions);
        expect(first.tradingTimesFilter).to.equal(second.tradingTimesFilter);
        expect(first.transactionsTotal).to.equal(second.transactionsTotal);

        expect(first).to.equal(second);
    });
});
