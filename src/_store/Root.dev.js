import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store, rehydratedStorePromise } from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import HashHistory from 'history/lib/createHashHistory';
import * as LiveData from '../_data/LiveData';

const history = new HashHistory();
rehydratedStorePromise.then(st => {
    LiveData.connect(st);
});

export default class Root extends Component {
    render() {
        // require a huge pile of text file deserialize into JS obj for translation
        return (
            <IntlProvider locale="en">
                <Provider store={store}>
                    <Router history={history} children={routes} />
                </Provider>
            </IntlProvider>
        );
    }
}
