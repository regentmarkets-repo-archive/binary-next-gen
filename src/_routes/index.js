import App from './App';

import MobileRoutes from './MobileRoutes';
import DesktopRoutes from './DesktopRoutes';
import CommonRoutes from './CommonRoutes';

const childRoutes = [].concat(DesktopRoutes).concat(MobileRoutes).concat(CommonRoutes);

export default {
    component: App,
    childRoutes,
};
