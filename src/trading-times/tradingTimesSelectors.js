import { createStructuredSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector, tradingTimesFilterSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
