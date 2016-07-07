import isMobile from 'binary-utils/lib/isMobile';
import MobileRoot from '../hello/MobileRoot';
import WebRoot from '../hello/WebRoot';
import { requireAuthOnEnter, signOut } from '../_data/Auth';
import SigninMobile from '../signin/SigninMobile';
import SignupMobile from '../create-account/SignupMobile';
import Signup2Mobile from '../create-account/Signup2Mobile';
import UpgradePage from '../upgrade/UpgradePage';

const rootComponent = isMobile() ? MobileRoot : WebRoot;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'signin', component: SigninMobile },
    { path: 'signup', component: SignupMobile },
    { path: 'signup2', component: Signup2Mobile },
    { path: 'upgrade', component: UpgradePage },
    { path: 'signout', component: SigninMobile, onEnter: signOut },
    { path: '*', component: rootComponent, onEnter: requireAuthOnEnter },
];
