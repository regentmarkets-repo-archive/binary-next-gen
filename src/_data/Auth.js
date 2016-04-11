import { store } from '../_store/persistentStore';
import * as LiveData from './LiveData';
import { signinFieldUpdate, updateAppState, removePersonalData, updateToken } from '../_actions';
import { trackUserId } from 'binary-utils/lib/Analytics';
import showError from 'binary-utils/lib/showError';

export const tryAuth = async (actions, token) => {
    if (!token) {
        actions.signinFieldUpdate('progress', false);
        actions.signinFieldUpdate('tokenNotEntered', true);
        throw new Error('Token does not exist');
    }

    actions.updateAppState('authorized', false);

    try {
        let response = await LiveData.api.authorize(token);
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

export const requireAuthOnEnter = (nextState, replace, callback) => {
    const authorized = store.getState().appState.get('authorized');
    if (authorized) {
        const isVirtual = store.getState().account.get('is_virtual') === 1;
        if (!isVirtual) {
            showError('This site currently in Preview, only Virtual Accounts are allowed.');
            signout(nextState, replace);
        }
    } else {
        replace({ pathname: '/signin', state: nextState });
    }
    callback();
};
