import { rehydratedStorePromise, store } from '../_store/configureStore';
import * as LiveData from './LiveData';
import { updateToken } from '../_actions/AccountActions';
import { signinFieldUpdate } from '../_actions/SigninActions';

let isAuthorized = false;

export const navigateTo = (nextState, replaceState, to) => {
    replaceState({ nextPathname: nextState.location.pathname }, to);
};

export const requireAuthOnEnter = (nextState, replaceState, cb) => {
    if (isAuthorized) {
        cb();
        return;
    }

    rehydratedStorePromise.then(st => {
        const newState = st.getState();
        if (!newState.account) {
            navigateTo(nextState, replaceState, '/signin');
            cb();
            return;
        }

        const token = newState.account.get('token');
        if (!token) {
            st.dispatch(signinFieldUpdate('progress', false));
            st.dispatch(signinFieldUpdate('tokenNotEntered', true));
            navigateTo(nextState, replaceState, '/signin');
            cb();
        } else {
            LiveData.api.authorize(token).then(
                () => {
                    st.dispatch(signinFieldUpdate('credentialsInvalid', false));
                    isAuthorized = true;
                },
                () => {
                    st.dispatch(signinFieldUpdate('credentialsInvalid', true));
                    navigateTo(nextState, replaceState, '/signin');
                })
                .then(() => {
                    st.dispatch(signinFieldUpdate('progress', false));
                    cb();
                });
        }
    });
};

export const signout = (nextState, replaceState) => {
    isAuthorized = false;
    store.dispatch(updateToken(''));
    navigateTo(nextState, replaceState, '/signin');
};
