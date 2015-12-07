import React, { Component } from 'react';
import { IntlProvider, defineMessages, addLocaleData } from 'react-intl';
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

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

const messages = defineMessages({
    bgBGDescription: {
        id: 'Balance',
        defaultMessage: 'Баланс',
    },
    enUPPERDescription: {
        id: 'Balance',
        defaultMessage: 'BALANCE',
    },
});

export default class Root extends Component {
    render() {
        return (
            <IntlProvider locale="bg-bg" messages={messages}>
                <Provider store={store}>
                    <Router history={history} children={routes} />
                </Provider>
            </IntlProvider>
        );
    }
}
