import { createStructuredSelector } from 'reselect';
import { assetsSelector, tradingTimesSelector } from '../_store/baseSelectors';
import { tradingTimesFilterSelector } from '../workspace/WorkspaceSelectors';

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
