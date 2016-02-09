import { createSelector, createStructuredSelector } from 'reselect';
import { workspaceSelector } from '../_store/baseSelectors';

export const assetIndexSubmarketSelector = createSelector(
    workspaceSelector,
    workspace => workspace.getIn(['assetIndex', 'submarketId']),
);

export const tradingTimesFilterSelector = createSelector(
    workspaceSelector,
    workspace => workspace.tradingTimes,
);

export default createStructuredSelector({
    workspace: workspaceSelector,
    assetIndexSubmarket: assetIndexSubmarketSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
