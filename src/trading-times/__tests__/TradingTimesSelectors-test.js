import { fromJS } from 'immutable';
import { expect } from 'chai';
import tradingTimesSelectors from '../tradingTimesSelectors';

describe('tradingTimesSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        tradingTimes: fromJS({}),
        views: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = tradingTimesSelectors(state);

        expect(actual).to.be.ok;
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = tradingTimesSelectors(state);
        const second = tradingTimesSelectors(state);

        expect(first.assets).to.equal(second.assets);
        expect(first.tradingTimes).to.equal(second.tradingTimes);
        expect(first.tradingTimesFilter).to.equal(second.tradingTimesFilter);

        expect(first).to.equal(second);
    });

    it('should work with empty state', () => {
        const actual = tradingTimesSelectors({
            views: fromJS({}),
        });
        const expected = {
            assets: undefined,
            tradingTimes: undefined,
            tradingTimesFilter: undefined,
        };
        expect(expected).to.deep.equal(actual);
    });
});
