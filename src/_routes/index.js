import App from './App';

import mobileRoutes from './MobileRoutes';
import webRoutes from './WebRoutes';
import standaloneRoutes from './StandaloneRoutes';
import commonRoutes from './CommonRoutes';

const childRoutes = []
    .concat(webRoutes)
    .concat(mobileRoutes)
    .concat(standaloneRoutes)
    .concat(commonRoutes);

export default {
    component: App,
    childRoutes,
};
