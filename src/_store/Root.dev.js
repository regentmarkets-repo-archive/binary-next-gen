import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import * as LiveData from '../_data/LiveData';

const history = new HashHistory();
const token = store.getState().signin.get('token');
LiveData.connect(store, token);

window.onerror = (errorMsg, url, lineNumber) => {
    alert('Error: ' + errorMsg + '\nScript: ' + url + '\nLine: ' + lineNumber);
};

export default class Root extends Component {
    render() {
        return (
            <IntlProvider locale="en">
                <Provider store={store}>
                    <Router history={history} children={routes} />
                </Provider>
            </IntlProvider>
        );
    }
}
