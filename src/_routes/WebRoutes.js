import WorkspaceContainer from '../workspace/WorkspaceContainer';

import { requireAuthOnEnter } from '../_data/Auth';

export default [
    { path: 'workspace', component: WorkspaceContainer, onEnter: requireAuthOnEnter },
];
