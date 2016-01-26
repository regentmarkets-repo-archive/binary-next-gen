import { store } from '../_store/persistentStore';
import { bindActionCreators } from 'redux';
import * as LiveData from './LiveData';
import { updateToken, signinFieldUpdate, updateAppState } from '../_actions';
import { trackUserId } from '../_utils/Analytics';

export const tryAuth = (st) => {
    const newState = st.getState();
    if (!newState.account) {
        return LiveData.api.ping();
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
        return LiveData.api.ping();
    }

    actions.updateAppState('authorized', false);
    return LiveData.api.authorize(token).then(
        response => {
            actions.signinFieldUpdate('credentialsInvalid', false);
            trackUserId(response.authorize.loginid);
            actions.updateAppState('authorized', true);
        },
        () => {
            actions.signinFieldUpdate('credentialsInvalid', true);
        })
        .then(() => {
            actions.signinFieldUpdate('progress', false);
        });
};

export const navigateTo = (nextState, replaceState, to) => {
    replaceState({ nextPathname: nextState.location.pathname }, to);
};

export const requireAuthOnEnter = (nextState, replaceState, cb) => {
    const authorized = store.getState().appState.get('authorized');
    if (authorized) {
        cb();
        return;
    }

    navigateTo(nextState, replaceState, '/signin');
    cb();
};

export const signout = (nextState, replaceState) => {
    store.dispatch(updateToken(''));
    store.dispatch(signinFieldUpdate('validatedOnce', false));
    store.dispatch(updateAppState('authorized', false));
    navigateTo(nextState, replaceState, '/signin');
};
