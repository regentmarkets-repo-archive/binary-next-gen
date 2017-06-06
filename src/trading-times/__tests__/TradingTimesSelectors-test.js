import { fromJS } from 'immutable';
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

        expect(actual).toBeDefined();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = tradingTimesSelectors(state);
        const second = tradingTimesSelectors(state);

        expect(first.assets).toEqual(second.assets);
        expect(first.tradingTimes).toEqual(second.tradingTimes);
        expect(first.tradingTimesFilter).toEqual(second.tradingTimesFilter);

        expect(first).toEqual(second);
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
        expect(expected).toEqual(actual);
    });
});
