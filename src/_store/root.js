import React, { Component } from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { store, rehydratedStorePromise, actions } from './persistentStore';
import { Router } from 'react-router';
import { trackRoute } from 'binary-utils/lib/Analytics';
import routes from '../_routes';
import history from '../_routes/hashHistory';
import { tryAuth } from '../_data/Auth';
import * as LiveData from '../_data/LiveData';
import AppStateProvider from './AppStateProvider';
import BootProvider from './BootProvider';

history.listen(location => trackRoute(location.pathname));

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

const emptyObject = {};

export default class Root extends Component {

    async componentWillMount() {
        const reyhdratedStore = await rehydratedStorePromise();
        const state = reyhdratedStore.getState();

        await LiveData.connect(reyhdratedStore);
        const token = state.account.get('token');

        try {
            await tryAuth(actions, token);
        } catch (e) {
            actions.updateAppState('authorized', false);
        } finally {
            actions.updateAppState('connected', true);
        }
    }

    createElementWithActions = (Element, props) => {
        if (!Object.keys(props.routeParams).length) {
            props.routeParams = emptyObject;
        }
        return <Element {...props} />;
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
