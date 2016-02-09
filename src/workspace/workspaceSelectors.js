import { createStructuredSelector } from 'reselect';
import { workspaceSelector } from '../_store/baseSelectors';

export const assetIndexSubmarketSelector = state =>
    state.workspace.getIn(['assetIndex', 'submarketId']);

export const tradingTimesFilterSelector = state =>
    state.workspace.get('tradingTimes');

export default createStructuredSelector({
    workspace: workspaceSelector,
});
