import isMobile from 'binary-utils/lib/isMobile';
import MobileRoot from '../hello/MobileRoot';
import WebRoot from '../hello/WebRoot';
import { requireAuthOnEnter, signOut } from '../_data/Auth';
import SigninMobile from '../signin/SigninMobile';
import CreateAccountMobile from '../create-account/CreateAccountMobile';
import UpgradePage from '../upgrade/UpgradePage';

const rootComponent = isMobile() ? MobileRoot : WebRoot;

export default [
    { path: '/', component: rootComponent, onEnter: requireAuthOnEnter },
    { path: 'signin', component: SigninMobile },
    { path: 'signup', component: CreateAccountMobile },
    { path: 'upgrade', component: UpgradePage },
    { path: 'signout', component: SigninMobile, onEnter: signOut },
    { path: '*', component: rootComponent, onEnter: requireAuthOnEnter },
];
