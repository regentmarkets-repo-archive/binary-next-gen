import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { provide } from 'react-redux';
import * as reducers from './_reducers';
import { devTools, persistState } from 'redux-devtools';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

@provide(store)
export default class Root extends React.Component {
    render() {
        const history = new BrowserHistory();

        return (
            <div>
                <Router history={history} children={routes}/>
            </div>
        );
        // <DebugPanel top right bottom>
        //     <DevTools store={store} monitor={LogMonitor} />
        // </DebugPanel>
    }
}
