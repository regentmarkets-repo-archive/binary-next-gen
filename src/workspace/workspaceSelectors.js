import { createStructuredSelector } from 'reselect';
import { workspaceSelector } from '../_store/directSelectors';

export default createStructuredSelector({
    workspace: workspaceSelector,
});
