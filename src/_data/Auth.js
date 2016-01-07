import { store } from '../_store/configureStore';
import * as LiveData from './LiveData';
import { updateToken, signinFieldUpdate, updateAppInfo } from '../_actions';
import { trackUserId } from '../_utils/Analytics';

export const tryAuth = (st) => {
    const newState = st.getState();
    if (!newState.account) {
        return Promise.reject();
    }

    const token = newState.account.get('token');
    if (!token) {
        st.dispatch(signinFieldUpdate('progress', false));
        st.dispatch(signinFieldUpdate('tokenNotEntered', true));
        return Promise.reject();
    }
    st.dispatch(updateAppInfo('authorized', false));
    return LiveData.api.authorize(token).then(
        response => {
            st.dispatch(signinFieldUpdate('credentialsInvalid', false));
            trackUserId(response.authorize.loginid);
            st.dispatch(updateAppInfo('authorized', true));
        },
        () => {
            st.dispatch(signinFieldUpdate('credentialsInvalid', true));
        })
        .then(() => {
            st.dispatch(signinFieldUpdate('progress', false));
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
    store.dispatch(updateAppInfo('authorized', false));
    navigateTo(nextState, replaceState, '/signin');
};
