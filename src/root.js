import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './_reducers';
import { Router } from 'react-router';
import HashHistory from 'history/lib/createHashHistory';
import routes from './_routes';
import LiveData from './_data/LiveData';
// import BrowserHistory from 'history/lib/createBrowserHistory';
// import DevTools from './_common/ReduxDevTools';

const store = createStore(reducers);

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
