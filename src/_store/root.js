import React, { Component } from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store, rehydratedStorePromise } from './persistentStore';
import { Router, hashHistory as history } from 'react-router';
import routes from '../_routes';
import { tryAuth } from '../_data/Auth';
import * as LiveData from '../_data/LiveData';
import * as allActions from '../_actions';
import AppStateProvider from './AppStateProvider';
import BootProvider from './BootProvider';
import { trackRoute } from 'binary-utils/lib/Analytics';

history.listen(location => trackRoute(location.pathname));

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

export default class Root extends Component {
    async componentWillMount() {
        const reyhdratedStore = await rehydratedStorePromise;
        let state = reyhdratedStore.getState();

        await LiveData.connect(reyhdratedStore);
        let actions = bindActionCreators(allActions, store.dispatch);
        let token = state.account.get('token');

        try {
            await tryAuth(actions, token);
        } catch (e) {
            actions.updateAppState('authorized', false);
        } finally {
            actions.updateAppState('connected', true);
        }
    }

    createElementWithActions(Element, props) {
        return (
            <Element {...props} actions={bindActionCreators(allActions, store.dispatch)} />
        );
    }

    render() {
        return (
            <Provider store={store}>
                <BootProvider>
                    <AppStateProvider>
                        <Router
                            history={history}
                            children={routes}
                            createElement={::this.createElementWithActions}
                        />
                    </AppStateProvider>
                </BootProvider>
            </Provider>
        );
    }
}
