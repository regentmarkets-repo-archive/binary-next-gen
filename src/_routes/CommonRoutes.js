import FullTradeMobile from '../fulltrade/FullTradeMobile';
import WebCard from '../web/WebCard';
import { requireAuthOnEnter, redirectFromOAuth } from '../_data/Auth';

const isMobile = /Mobile/.test(window.navigator.userAgent);

const rootComponent = isMobile ? FullTradeMobile : WebCard;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'redirect', component: rootComponent, onEnter: redirectFromOAuth },
];
