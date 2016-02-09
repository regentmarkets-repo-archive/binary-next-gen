import { createStructuredSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector } from '../_store/directSelectors';
import { tradingTimesFilterSelector } from '../workspace/workspaceSelectors';

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
