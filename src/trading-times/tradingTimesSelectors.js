import { createStructuredSelector, createSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector, tradingTimesFilterSelector } from '../_store/directSelectors';
import { Map } from 'immutable';

const defaultTradingTimesSelector = createSelector(
    [assetsSelector, tradingTimesFilterSelector],
    (assets, tradingTimesFilter) => {
        if (!assets) {
            return undefined;
        }
        const defaultFilter = new Map({
                        submarket: assets.getIn([0, 'submarket']),
                        filter: assets.getIn([0, 'submarket']),
                        date: new Date(),
                    });
        const filter = tradingTimesFilter && tradingTimesFilter.get('filter');

        return filter ? tradingTimesFilter : defaultFilter;
    }
);

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: defaultTradingTimesSelector,
});
