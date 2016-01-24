import { createSelector, createStructuredSelector } from 'reselect';
import { toPlainJS } from '../_utils/ObjectUtils';

export const workspaceSelector = state => toPlainJS(state.workspace);

export const assetIndexSubmarketSelector = createSelector(
    workspaceSelector,
    workspace => workspace.assetIndex.submarketId,
);

export const tradingTimesFilterSelector = createSelector(
    workspaceSelector,
    workspace => workspace.tradingTimes,
);

export default createStructuredSelector({
    assetIndexSubmarket: assetIndexSubmarketSelector,
    tradingTimesFilter: tradingTimesFilterSelector,
});
