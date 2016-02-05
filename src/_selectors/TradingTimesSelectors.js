import { createStructuredSelector } from 'reselect';
import { assetsSelector } from './AssetSelectors';
import { tradingTimesFilterSelector } from './WorkspaceSelectors';

export const tradingTimesSelector = state => state.tradingTimes;

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
