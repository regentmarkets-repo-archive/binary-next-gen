import TickTradeMobile from '../tick-trade/TickTradeMobile';
import WorkspaceContainer from '../workspace/WorkspaceContainer';
import { requireAuthOnEnter } from '../_data/Auth';

const isMobile = /Mobile/.test(window.navigator.userAgent);

const rootComponent = isMobile ? TickTradeMobile : WorkspaceContainer;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
];
