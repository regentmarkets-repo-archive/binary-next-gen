import TickTradeMobile from '../tick-trade/TickTradeMobile';
import WebCard from '../web/WebCard';
import TradesContainer from '../trades/TradesContainer';
import { requireAuthOnEnter } from '../_data/Auth';

const isMobile = /Mobile/.test(window.navigator.userAgent);

const rootComponent = isMobile ? TickTradeMobile : WebCard;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'test', component: TradesContainer, onEnter: requireAuthOnEnter },
];
