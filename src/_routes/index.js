import App from './App';

import TickTradeRoutes from './TickTradeRoutes';
import DesktopRoutes from './DesktopRoutes';
import CommonRoutes from './CommonRoutes';

const childRoutes = [].concat(DesktopRoutes).concat(TickTradeRoutes).concat(CommonRoutes);

export default {
    component: App,
    childRoutes: childRoutes,
};
