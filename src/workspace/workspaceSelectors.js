import { createStructuredSelector } from 'reselect';
import { workspaceSelector, upgradeInfoSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    workspace: workspaceSelector,
    upgradeInfo: upgradeInfoSelector,
});
