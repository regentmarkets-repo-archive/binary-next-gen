import { store } from '../_store/persistentStore';
import * as LiveData from './LiveData';
import { signinFieldUpdate, updateAppState, removePersonalData, updateToken } from '../_actions';
import { trackUserId } from 'binary-utils/lib/Analytics';
// import showError from 'binary-utils/lib/showError';

export const tryAuth = async (actions, token) => {
    if (!token) {
        actions.signinFieldUpdate('progress', false);
        actions.signinFieldUpdate('tokenNotEntered', true);
    }

    actions.updateAppState('authorized', false);

    try {
        const response = await LiveData.api.authorize(token);
        actions.signinFieldUpdate('credentialsInvalid', false);
        trackUserId(response.authorize.loginid);
    } catch (e) {
        actions.signinFieldUpdate('credentialsInvalid', true);
    } finally {
        actions.signinFieldUpdate('progress', false);
    }
};

export const signout = (nextState, replace) => {
    store.dispatch(removePersonalData());
    store.dispatch(signinFieldUpdate('validatedOnce', false));
    store.dispatch(updateAppState('authorized', false));
    store.dispatch(updateToken(''));
    replace({ pathname: '/signin', state: nextState });
};
const parseOAuthResponse = (responseUrl) => {
    const matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
    const urlParts = responseUrl.split('?');
    if (urlParts.length !== 2) {
        throw new Error('Not a valid url');
    }

    const params = urlParts[1].split(matcher);

    const accounts = [];

    for (let i = 1; i < params.length; i += 3) {
        accounts.push({
            account: params[i],
            token: params[i + 1],
        });
    }

    return accounts;
};
const parseUrl = (url) => {
    const accounts = parseOAuthResponse(url);
    window.BinaryBoot.accounts = accounts;
    try {
        window.localStorage.setItem('boot', JSON.stringify(window.BinaryBoot));
        window.localStorage.setItem('account', JSON.stringify({ token: accounts[0].token }));
    } catch (e) {
        window.console.log('Error while saving boot config', e);
    }
};
export const requireAuthOnEnter = (nextState, replace, callback) => {
    const authorized = store.getState().appState.get('authorized');
    if (!authorized) {
        const oAuthUrl = `https://oauth.binary.com/oauth2/authorize?app_id=${window.BinaryBoot.appId}`;
        const winAuth = window.open(oAuthUrl, '_blank', 'location=no');
        winAuth.addEventListener('loadstop', (e) => {
             if (e.url.indexOf('acct1') > -1) {
                 parseUrl(e.url);
                 winAuth.close();
             }
        });
    }
    //     replace({ pathname: '/signin', state: nextState });
    callback();
};
