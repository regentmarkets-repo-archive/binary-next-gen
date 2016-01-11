import { store } from '../_store/configureStore';
import { bindActionCreators } from 'redux';
import * as LiveData from './LiveData';
import { updateToken, signinFieldUpdate, updateAppInfo } from '../_actions';
import { trackUserId } from '../_utils/Analytics';

export const tryAuth = (st) => {
    const newState = st.getState();
    if (!newState.account) {
        return Promise.reject();
    }

    const token = newState.account.get('token');
    const actions = bindActionCreators(
        {
            updateToken,
            signinFieldUpdate,
            updateAppInfo,
        },
        st.dispatch
    );

    if (!token) {
        actions.signinFieldUpdate('progress', false);
        actions.signinFieldUpdate('tokenNotEntered', true);
        return Promise.reject();
    }

    actions.updateAppInfo('authorized', false);
    return LiveData.api.authorize(token).then(
        response => {
            actions.signinFieldUpdate('credentialsInvalid', false);
            trackUserId(response.authorize.loginid);
            actions.updateAppInfo('authorized', true);
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
    const authorized = store.getState().appInfo.get('authorized');
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
    store.dispatch(updateAppInfo('authorized', false));
    navigateTo(nextState, replaceState, '/signin');
};
