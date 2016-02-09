import { createSelector } from 'reselect';
import { workspaceSelector } from '../_store/directSelectors';

export default createSelector(
    workspaceSelector,
    workspace => ({
        leftPanelVisible: workspace.get('leftPanelVisible'),
        bottomPanelVisible: workspace.get('bottomPanelVisible'),
        rightPanelVisible: workspace.get('rightPanelVisible'),
    }),
);
