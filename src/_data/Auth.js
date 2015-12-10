import { rehydratedStorePromise, store } from '../_store/configureStore';
import * as LiveData from './LiveData';
import { serverAuthFailed, removeToken } from '../_actions/AccountActions';
import { signinFailed } from '../_actions/SigninActions';

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
            st.dispatch(signinFailed());
            navigateTo(nextState, replaceState, '/signin');
            cb();
        } else {
            LiveData.api.authorize(token).then(
                () => {
                    isAuthorized = true;
                },
                err => {
                    st.dispatch(serverAuthFailed(err));
                    st.dispatch(signinFailed());
                    navigateTo(nextState, replaceState, '/signin');
                }
            ).then(cb);
        }
    });
};

export const signout = (nextState, replaceState) => {
    isAuthorized = false;
    store.dispatch(removeToken());
    navigateTo(nextState, replaceState, '/signin');
};
