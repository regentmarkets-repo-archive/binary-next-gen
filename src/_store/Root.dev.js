import React, { Component } from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { store, rehydratedStorePromise } from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import ReactiveIntlProvider from '../_routes/ReactiveIntlProvider';
import HashHistory from 'history/lib/createHashHistory';
import * as LiveData from '../_data/LiveData';

const history = new HashHistory();
rehydratedStorePromise.then(st => {
    LiveData.connect(st);
});

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <ReactiveIntlProvider>
                    <Router history={history} children={routes} />
                </ReactiveIntlProvider>
            </Provider>
        );
    }
}
