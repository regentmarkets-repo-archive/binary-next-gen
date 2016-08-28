import { createStructuredSelector, createSelector } from 'reselect';
import { Map } from 'immutable';
import { assetsSelector, tradingTimesSelector, tradingTimesFilterSelector } from '../_store/directSelectors';

const defaultTradingTimesSelector = createSelector(
    [assetsSelector, tradingTimesFilterSelector],
    (assets, tradingTimesFilter) => {
        if (!assets) {
            return undefined;
        }
        const defaultFilter = new Map({
            filter: assets.getIn([0, 'market']),
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
