import {rehydratedStorePromise, store} from '../_store/configureStore';
import * as LiveData from './LiveData';
import {signinFieldUpdate} from '../_actions/SigninActions';

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
        if (!newState.signin) {
            navigateTo(nextState, replaceState, '/signin');
            cb();
            return;
        }

        const token = newState.signin.get('token');
        if (!token) {
            navigateTo(nextState, replaceState, '/signin');
            cb();
        } else {
            LiveData.api.authorize(token).then(
                () => {
                    isAuthorized = true;
                },
                () => {
                    navigateTo(nextState, replaceState, '/signin');
                }
            ).then(cb);
        }
    });
};

export const signout = (nextState, replaceState) => {
    isAuthorized = false;
    store.dispatch(signinFieldUpdate('token', ''));
    navigateTo(nextState, replaceState, '/signin');
};
