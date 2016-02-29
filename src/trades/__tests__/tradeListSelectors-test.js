import { fromJS } from 'immutable';
import { expect } from 'chai';
import tradeListSelectors from '../tradeListSelectors';

describe('tradeListSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        account: fromJS({}),
        ticks: fromJS({}),
        trades: fromJS([]),
        tradingOptions: fromJS([]),
        tradingTimes: fromJS([]),
        workspace: fromJS({})
    });

    it('can be instantiated', () => {
        const state = emptyState();
        const actual = tradeListSelectors(state);

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = tradeListSelectors(state);
        const second = tradeListSelectors(state);

        expect(first.trades).to.equal(second.trades);
        expect(first.assets).to.equal(second.assets);
        expect(first.currency).to.equal(second.currency);

        expect(first).to.equal(second);
    });
});
