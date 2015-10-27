import React from 'react';
import { compose, createStore } from 'redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { Provider } from 'react-redux';
import reducers from './_reducers';
import { Router } from 'react-router';
import HashHistory from 'history/lib/createHashHistory';
import routes from './_routes';
import LiveData from './_data/LiveData';
// import BrowserHistory from 'history/lib/createBrowserHistory';
// import DevTools from './_common/ReduxDevTools';

const reducer = compose(
    mergePersistedState()
)(reducers);

const storage = compose(
    filter('nested.key')
)(adapter(window.localStorage));

const createPersistentStore = compose(
    persistState(storage, 'my-storage-key')
)(createStore);

const store = createPersistentStore(reducer);

// const store = createStore(reducers);

export default class Root extends React.Component {
    render() {
        const history = new HashHistory();
        const liveData = new LiveData(store);
        // <DevTools />
        liveData.initUnauthorized();
        return (
            <Provider store={store}>
                <Router history={history} children={routes} />
            </Provider>
        );
    }
}
