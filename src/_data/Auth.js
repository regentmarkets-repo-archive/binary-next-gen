import { store } from '../_store/persistentStore';
import { bindActionCreators } from 'redux';
import * as LiveData from './LiveData';
import { updateToken, signinFieldUpdate, updateAppState, removePersonalData } from '../_actions';
import { trackUserId } from '../_utils/Analytics';

export const tryAuth = (st) => {
    const newState = st.getState();
    if (!newState.account) {
        return Promise.reject('No account');
    }

    const token = newState.account.get('token');
    const actions = bindActionCreators(
        {
            updateToken,
            signinFieldUpdate,
            updateAppState,
        },
        st.dispatch
    );

    if (!token) {
        actions.signinFieldUpdate('progress', false);
        actions.signinFieldUpdate('tokenNotEntered', true);
        return Promise.reject('Token does not exists');
    }

    actions.updateAppState('authorized', false);
    return LiveData.api.authorize(token)
        .then(
            response => {
                actions.signinFieldUpdate('credentialsInvalid', false);
                trackUserId(response.authorize.loginid);
                actions.updateAppState('authorized', true);
            },
            () => actions.signinFieldUpdate('credentialsInvalid', true))
        .then(() => {
            actions.signinFieldUpdate('progress', false);
        });
};

export const requireAuthOnEnter = (nextState, replace, callback) => {
    const authorized = store.getState().appState.get('authorized');
    if (authorized) {
        callback();
        return;
    }

    replace({ pathname: '/signin', state: nextState });
    callback();
};

export const signout = (nextState, replace) => {
    store.dispatch(removePersonalData());
    store.dispatch(signinFieldUpdate('validatedOnce', false));
    store.dispatch(updateAppState('authorized', false));
    replace({ pathname: '/signin', state: nextState });
};
