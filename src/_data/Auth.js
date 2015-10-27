import StateStorage from '../_store/StateStorage';
import LiveData from './LiveData';

export const navigateTo = (nextState, replaceState, to) => {
    replaceState({ nextPathname: nextState.location.pathname }, to);
};

export const requireAuthOnEnter = (nextState, replaceState) => {
    console.log('trying', StateStorage.get('token'));
    const token = StateStorage.get('token');
    console.log('trying', StateStorage.get('token'));
    if (!token) {
        navigateTo(nextState, replaceState, '/signin');
    } else {
        const liveData = LiveData.instance();
        console.log('trying', StateStorage.get('token'));
        liveData.api.authorize(token).then(
            () => {
                console.log('token is', StateStorage.get('token'));
                liveData.initAuthorized();
                navigateTo(nextState, replaceState, '/');
            },
            () => { navigateTo(nextState, replaceState, '/signin'); console.log('error is', StateStorage.get('token')); }
        );
    }
};

export const signout = (nextState, replaceState) => {
    StateStorage.set('token', '');
    navigateTo(nextState, replaceState, '/signin');
};
