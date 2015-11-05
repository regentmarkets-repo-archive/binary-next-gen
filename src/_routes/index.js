import App from './App';

import TickTradeRoutes from './TickTradeRoutes';
import DesktopRoutes from './DesktopRoutes';
import CommonRoutes from './CommonRoutes';

import HelloWorldRoute from './HelloWorldRoute'

const childRoutes = [].concat(DesktopRoutes).concat(TickTradeRoutes).concat(CommonRoutes).concat(HelloWorldRoute);

export default {
    component: App,
    childRoutes: childRoutes,
};
