import { createStructuredSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector } from '../_store/directSelectors';
import { tradingTimesFilterSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
