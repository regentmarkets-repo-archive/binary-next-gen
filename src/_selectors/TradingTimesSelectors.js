import { createStructuredSelector } from 'reselect';
import { toPlainJS } from '../_utils/ObjectUtils';
import { assetsSelector } from './AssetSelectors';
import { tradingTimesFilterSelector } from './WorkspaceSelectors';

const tradingTimesSelector = state => toPlainJS(state.tradingTimes);

export default createStructuredSelector({
    assets: assetsSelector,
    tradingTimes: tradingTimesSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
