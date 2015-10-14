import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './_reducers';
import { devTools, persistState } from 'redux-devtools';
import { Router } from 'react-router';
import BrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import LiveData from './_data/LiveData';
// import openDevTools from './common/ReduxDevTools';

const finalCreateStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducers);

export default class Root extends React.Component {
    render() {
        const history = new BrowserHistory();
        const liveData = new LiveData(store);
        // openDevTools(store);
        liveData.init();
        return (
            <Provider store={store}>
                <Router history={history} children={routes}/>
            </Provider>
        );
    }
}
