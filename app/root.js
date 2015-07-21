import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './_reducers';
import { Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class Root extends React.Component {
    render() {
        const history = new BrowserHistory();

        return (
            <Provider store={store}>
                {() => <Router history={history} children={routes}/> }
            </Provider>
        );
    }
}
