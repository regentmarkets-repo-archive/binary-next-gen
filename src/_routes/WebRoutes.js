import WebCard from '../web/WebCard';

import { requireAuthOnEnter } from '../_data/Auth';

export default [
    { path: 'web', component: WebCard, onEnter: requireAuthOnEnter },
];
