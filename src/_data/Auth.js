import { trackUserId } from 'binary-utils/lib/misc/Analytics';
import { showError } from 'binary-utils';
import { store } from '../_store/persistentStore';
import { history, accountExclusion } from '../_store/root';
import { api } from './LiveData';
import { updateAppState, removePersonalData, updateToken, updateBoot } from '../_actions';

let authWindow = null;
const electron = window.electron;

export const tryAuth = async token => {
    store.dispatch(updateAppState('authorized', false));
    try {
        const response = await api.authorize(token);
        store.dispatch(updateAppState('authorized', true));
        store.dispatch(updateBoot('currency', response.authorize.currency));
        store.dispatch(updateBoot('balance', response.authorize.balance));
        trackUserId(response.authorize.loginid);
    } catch (e) {
        if (e.error && e.error.error.code === 'SelfExclusion') {
            const exlcudedAcct = window.BinaryBoot.accounts.find(x => x.token === token).account;
            await accountExclusion(token);
            store.dispatch(updateToken(token));
            showError('You have exlcluded yourself from account ' + exlcudedAcct);
        }
    }
};

export const signOut = () => {
    api.logOut();
    store.dispatch(removePersonalData());
    store.dispatch(updateAppState('authorized', false));
    store.dispatch(updateToken(''));
    history.push('/');
};

export const signIn = () => {
    const oAuthUrl = `${window.BinaryBoot.oAuthUrl}?app_id=${window.BinaryBoot.appId}&l=${window.BinaryBoot.language}`;
    if (electron) {
        const { BrowserWindow } = electron.remote;
        authWindow = new BrowserWindow({
            name: 'Binary.com',
            title: 'Login',
            width: 1024,
            height: 680,
            show: false,
        });
        authWindow.loadURL(oAuthUrl);
        authWindow.once('ready-to-show', () => {
            authWindow.show();
        });
        authWindow.setResizable(false);
        authWindow.on('close', () => {
            authWindow = null;
        }, false);
        authWindow.webContents.on('did-get-redirect-request', (e, oldUrl, newUrl) => {
            const accounts = window.BinaryBoot.parseUrl(newUrl);
            store.dispatch(updateBoot('accounts', accounts));
            store.dispatch(updateToken(accounts[0].token));
            tryAuth(accounts[0].token);
            authWindow.close();
        });
    } else if (window.cordova) {
        // open another webview for login page
        const winAuth = window.cordova.InAppBrowser.open(oAuthUrl, '_blank', 'location=no');

        // after login success
        // get account info from redirect url and close webview
        winAuth.addEventListener('loadstart', e => {
            if (e.url.indexOf('acct1') > -1) {
                const accounts = window.BinaryBoot.parseUrl(e.url);
                store.dispatch(updateBoot('accounts', accounts));
                store.dispatch(updateToken(accounts[0].token));
                tryAuth(accounts[0].token);
                winAuth.close();
                window.location.reload(true);
            }
        });
    } else {
        window.location = oAuthUrl;
    }
};

export const requireAuthOnEnter = (nextState, replace, callback) => {
    const authorized = store.getState().appState.get('authorized');
    const rootPaths = ['/', '/beta', '/index.html', '/beta/index.html'];
    const { location } = nextState;
    if (!authorized && (rootPaths.indexOf(location.pathname) === -1)) {
        replace({
            pathname: window.BinaryBoot.redirectUrl,
            state: nextState,
        });
    }
    callback();
};
