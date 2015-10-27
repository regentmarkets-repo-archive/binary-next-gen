import StateStorage from '../_store/StateStorage';
import LiveData from './LiveData';

export const navigateTo = (nextState, replaceState, to) => {
    replaceState({ nextPathname: nextState.location.pathname }, to);
};

export const requireAuthOnEnter = (nextState, replaceState) => {
    const token = StateStorage.get('token');

    if (!token) {
        navigateTo(nextState, replaceState, '/signin');
    } else {
        const liveData = LiveData.instance();
        liveData.api.authorize(token).then(
            () => {
                liveData.initAuthorized();
                navigateTo(nextState, replaceState, '/');
            },
            () => { navigateTo(nextState, replaceState, '/signin'); }
        );
    }
};

export const signout = (nextState, replaceState) => {
    StateStorage.set('token', '');
    navigateTo(nextState, replaceState, '/signin');
};
