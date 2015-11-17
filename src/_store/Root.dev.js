import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import * as LiveData from '../_data/LiveData';
import StateStorage from '../_store/StateStorage';

const store = configureStore();
const history = new HashHistory();

LiveData.connect(store, StateStorage.get('token'));

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} children={routes} />
            </Provider>
        );
    }
}
