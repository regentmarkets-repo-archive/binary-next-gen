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

if (window.BinaryBoot.isBeta) {
    for (let i = 0; i < childRoutes.length; i++) {
        if (childRoutes[i].path === '/') {
            childRoutes[i].path = 'beta';
        } else {
            childRoutes[i].path = 'beta/' + childRoutes[i].path;
        }
    }
}

export default {
    component: App,
    childRoutes,
};
