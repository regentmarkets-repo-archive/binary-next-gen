import TickTradeRoutes from './TickTradeRoutes';
import DesktopRoutes from './DesktopRoutes';

const childRoutes = [].concat(DesktopRoutes).concat(TickTradeRoutes);

export default {
    component: 'div',
    childRoutes: childRoutes,
};
