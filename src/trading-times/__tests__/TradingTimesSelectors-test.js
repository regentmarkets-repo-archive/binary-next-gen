import { fromJS } from 'immutable';
import expect from 'expect';
import tradingTimesSelectors from '../tradingTimesSelectors';

describe('tradingTimesSelectors', () => {
    const emptyState = () => ({
        assets: fromJS([]),
        tradingTimes: fromJS({}),
        workspace: fromJS({}),
    });

    it('should be able to execute', () => {
        const state = emptyState();

        const actual = tradingTimesSelectors(state);

        expect(actual).toExist();
    });

    it('should return the same result for the same state', () => {
        const state = emptyState();

        const first = tradingTimesSelectors(state);
        const second = tradingTimesSelectors(state);

        expect(first.assets).toBe(second.assets);
        expect(first.tradingTimes).toBe(second.tradingTimes);
        expect(first.tradingTimesFilter).toBe(second.tradingTimesFilter);

        expect(first).toBe(second);
    });

    it('should work with empty state', () => {
        const actual = tradingTimesSelectors({
            workspace: {},
        });
        const expected = {
            assets: undefined,
            tradingTimes: undefined,
            tradingTimesFilter: undefined,
        };
        expect(expected).toEqual(actual);
    });
});
