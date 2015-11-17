import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
// <DevTools />
import {store} from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import * as LiveData from '../_data/LiveData';

const history = new HashHistory();

LiveData.connect(store, store.getState().signin.get('token'));

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} children={routes} />
            </Provider>
        );
    }
}
