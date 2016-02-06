import { createSelector, createStructuredSelector } from 'reselect';

export const workspaceSelector = state => state.workspace;

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
