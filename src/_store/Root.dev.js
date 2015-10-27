import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
// <DevTools />
import configureStore from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import LiveData from '../_data/LiveData';
import StateStorage from '../_store/StateStorage';

const store = configureStore();
const history = new HashHistory();

const liveData = new LiveData(store);
liveData.initUnauthorized();
liveData.api.authorize(StateStorage.get('token'));
liveData.initAuthorized();

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
