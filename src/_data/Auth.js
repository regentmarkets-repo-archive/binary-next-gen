import {loadedStorePromise, store} from '../_store/configureStore';
import * as LiveData from './LiveData';
import {signinFieldUpdate} from '../_actions/SigninActions';

export const navigateTo = (nextState, replaceState, to) => {
    replaceState({ nextPathname: nextState.location.pathname }, to);
};

export const requireAuthOnEnter = (nextState, replaceState) => {
    loadedStorePromise.then( newState => {
        const token = newState.signin.token;

        if (!token) {
            navigateTo(nextState, replaceState, '/signin');
        } else {
            LiveData.api.authorize(token).then(
                () => {
                    navigateTo(nextState, replaceState, '/');
                },
                () => { navigateTo(nextState, replaceState, '/signin'); }
            );
        }
    });
};

export const signout = (nextState, replaceState) => {
    store.dispatch(signinFieldUpdate('token', ''));
    navigateTo(nextState, replaceState, '/signin');
};
