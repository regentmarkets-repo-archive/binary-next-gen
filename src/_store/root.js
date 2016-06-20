import React, { Component } from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store, rehydratedStorePromise } from './persistentStore';
import { Router, browserHistory as history } from 'react-router';
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

const emptyObject = {};

export default class Root extends Component {

    async componentWillMount() {
        const reyhdratedStore = await rehydratedStorePromise;
        const state = reyhdratedStore.getState();

        await LiveData.connect(reyhdratedStore);
        const token = state.account.get('token');

        this.actions = bindActionCreators(allActions, store.dispatch);

        try {
            await tryAuth(this.actions, token);
        } catch (e) {
            this.actions.updateAppState('authorized', false);
        } finally {
            this.actions.updateAppState('connected', true);
        }
    }

    createElementWithActions = (Element, props) => {
        if (!Object.keys(props.routeParams).length) {
            props.routeParams = emptyObject;
        }
        return <Element {...props} actions={this.actions} />;
    }

    render() {
        return (
            <Provider store={store}>
                <BootProvider>
                    <AppStateProvider>
                        <Router
                            history={history}
                            children={routes}
                            createElement={this.createElementWithActions}
                        />
                    </AppStateProvider>
                </BootProvider>
            </Provider>
        );
    }
}
