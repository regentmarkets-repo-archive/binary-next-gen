import { createSelector, createStructuredSelector } from 'reselect';

export const workspaceSelector = state => state.workspace;

export const assetIndexSubmarketSelector = createSelector(
    [workspaceSelector],
    (workspace) => ({
        submarket: workspace.get('assetIndex').get('submarketId'),
    })
);

export default createStructuredSelector({
    assetIndexSubmarket: assetIndexSubmarketSelector,
});
