import TickTradeMobile from '../tick-trade/TickTradeMobile';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import TradesContainer from '../trades/TradesContainer';
import { requireAuthOnEnter } from '../_data/Auth';

const isMobile = /Mobile/.test(window.navigator.userAgent);

const rootComponent = isMobile ? TickTradeMobile : WorkspaceContainer;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'test', component: TradesContainer, onEnter: requireAuthOnEnter },
];
