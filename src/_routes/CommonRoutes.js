import TickTradeMobile from '../tick-trade/TickTradeMobile';
import WebCard from '../web/WebCard';
import { requireAuthOnEnter } from '../_data/Auth';
import OnlyVirtualPage from '../only-virtual/OnlyVirtualPage';

const isMobile = /Mobile/.test(window.navigator.userAgent);

const rootComponent = isMobile ? TickTradeMobile : WebCard;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: '/only_virtual', component: OnlyVirtualPage },
];
