import MobileRoot from '../hello/MobileRoot';
import WebRoot from '../hello/WebRoot';
import { requireAuthOnEnter } from '../_data/Auth';
import isMobile from 'binary-utils/lib/isMobile';

const rootComponent = isMobile() ? MobileRoot : WebRoot;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: '*', component: rootComponent, onEnter: requireAuthOnEnter },
];
