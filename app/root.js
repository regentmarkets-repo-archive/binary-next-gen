import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './_reducers';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router } from 'react-router';
import BrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import LiveData from './_data/LiveData';

const finalCreateStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

function openDevTools() {
    const win = window.open(null, 'redux-devtools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
    win.location.reload();

    setTimeout(() => {
        ReactDOM.render(
            <DebugPanel top right bottom left >
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        , win.document.body);
    }, 10);
}

export default class Root extends React.Component {
    render() {
        const history = new BrowserHistory();
        const liveData = new LiveData(store);
        openDevTools();
        liveData.init();
        return (
            <Provider store={store}>
                <Router history={history} children={routes}/>
            </Provider>
        );
    }
}
