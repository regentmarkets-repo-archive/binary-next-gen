import { createSelector } from 'reselect';
import { workspaceSelector } from '../_store/directSelectors';

export default createSelector(
    workspaceSelector,
    workspace => ({
        leftPanelVisible: workspace.get('leftPanelVisible'),
        rightPanelVisible: workspace.get('rightPanelVisible'),
    }),
);
