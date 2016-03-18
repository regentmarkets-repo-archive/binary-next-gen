import { store } from '../_store/persistentStore';
import * as LiveData from './LiveData';
import { signinFieldUpdate, updateAppState, removePersonalData } from '../_actions';
import { trackUserId } from '../_utils/Analytics';
import { showError } from '../_utils/MessagingUtils';

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
    replace({ pathname: '/signin', state: nextState });
};

export const requireAuthOnEnter = (nextState, replace, callback) => {
    const authorized = store.getState().appState.get('authorized');
    const isVirtual = store.getState().account.get('is_virtual') === 1;
    if (authorized) {
        if (isVirtual) {
            callback();
        } else {
            showError('This site currently in Beta version, only Virtual Accounts are allowed.');
            signout(nextState, replace);
            callback();
        }
        return;
    }

    replace({ pathname: '/signin', state: nextState });
    callback();
};
