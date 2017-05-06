import AboutCard from '../web/AboutCard';
import WebCard from '../web/WebCard';

import { requireAuthOnEnter } from '../_data/Auth';

export default [
    { path: 'about', component: AboutCard },
    { path: 'web', component: WebCard, onEnter: requireAuthOnEnter },
];
