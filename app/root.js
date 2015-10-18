import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './_reducers';
import { Router } from 'react-router';
import BrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import LiveData from './_data/LiveData';
// import DevTools from './common/ReduxDevTools';

const store = createStore(reducers);

export default class Root extends React.Component {
    render() {
        const history = new BrowserHistory();
        const liveData = new LiveData(store);
        // <DevTools />
        liveData.init();
        return (
            <Provider store={store}>
                <Router history={history} children={routes} />
            </Provider>
        );
    }
}
