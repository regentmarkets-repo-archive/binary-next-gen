import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
// <DevTools />
import configureStore from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import LiveData from '../_data/LiveData';

const store = configureStore();
const history = new HashHistory();

const liveData = new LiveData(store);
liveData.initUnauthorized();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} children={routes} />
                </div>
            </Provider>
        );
    }
}
