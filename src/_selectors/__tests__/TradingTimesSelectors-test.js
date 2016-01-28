import expect from 'expect';
import tradingTimesSelectors from '../TradingTimesSelectors'

describe('TradingTimesSelectors', () => {
    describe('tradingTimesFilter', () => {
        it('should work with empty state', () => {
            const actual = tradingTimesSelectors({
                workspace: {}
            });
            const expected = {
                assets: undefined,
                tradingTimes: undefined,
                tradingTimesFilter: undefined,
            };
            expect(actual).toEqual(expected);
        });
    });
});
