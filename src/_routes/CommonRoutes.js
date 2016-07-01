import TradeMobile from '../trade/mobile/TradeMobile';
import WebCard from '../web/WebCard';
import { requireAuthOnEnter } from '../_data/Auth';
import isMobile from 'binary-utils/lib/isMobile';

const rootComponent = isMobile() ? TradeMobile : WebCard;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: '*', component: rootComponent, onEnter: requireAuthOnEnter },
];
