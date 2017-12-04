import { isMobile } from 'binary-utils';
import MobileRoot from '../hello/MobileRoot';
import WebRoot from '../hello/WebRoot';
import { requireAuthOnEnter, signOut } from '../_data/Auth';
import SignupMobile from '../create-account/SignupMobile';
import Signup2Mobile from '../create-account/Signup2Mobile';
import UpgradeContainer from '../upgrade/UpgradeContainer';
import SetCurrencyContainer from '../set-currency/SetCurrencyContainer';

const rootComponent = isMobile() ? MobileRoot : WebRoot;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'signup', component: SignupMobile },
    { path: 'signup2', component: Signup2Mobile },
    { path: 'upgrade', component: UpgradeContainer },
    { path: 'set-currency', component: SetCurrencyContainer },
    { path: 'signout', component: rootComponent, onEnter: signOut },
    { path: '*', component: rootComponent, onEnter: requireAuthOnEnter },
];
