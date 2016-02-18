import React, { Component } from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store, rehydratedStorePromise } from './persistentStore';
import { Router } from 'react-router';
import routes from '../_routes';
import { tryAuth } from '../_data/Auth';
import * as LiveData from '../_data/LiveData';
import * as AllActions from '../_actions';
import AppStateProvider from './AppStateProvider';
import AppConfigProvider from './AppConfigProvider';
import { hashHistory as history } from 'react-router';
import { trackRoute } from '../_utils/Analytics';

history.listen(location => trackRoute(location.pathname));

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

export default class Root extends Component {
    componentWillMount() {
        rehydratedStorePromise.then(st => {
            LiveData.connect(st);
            tryAuth(st)
                .then(
                    () => {
                        st.dispatch(AllActions.updateAppState('connected', true));
                    },
                    () => {
                        st.dispatch(AllActions.updateAppState('connected', true));
                    }
                );
        });
    }

    createElementWithActions(Element, props) {
        return (
            <Element {...props} actions={bindActionCreators(AllActions, store.dispatch)}/>
        );
    }

    render() {
        return (
            <Provider store={store}>
                <AppStateProvider>
                    <AppConfigProvider>
                        <Router
                            history={history}
                            children={routes}
                            createElement={::this.createElementWithActions}
                        />
                    </AppConfigProvider>
                </AppStateProvider>
            </Provider>
        );
    }
}
