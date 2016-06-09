import { createStructuredSelector, createSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector, tradingTimesFilterSelector } from '../_store/directSelectors';
import { Map } from 'immutable';

const defaultTradingTimesSelector = createSelector(
    [assetsSelector, tradingTimesFilterSelector],
    (assets, tradingTimesFilter) => {
        const defaultFilter = new Map({
                        submarket: assets.get(0).get('submarket'),
                        filter: assets.get(0).get('submarket'),
                        date: new Date(),
                    });
        const filter = tradingTimesFilter.get('filter');

        return filter ? tradingTimesFilter : defaultFilter;
    }
);

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: defaultTradingTimesSelector,
});
