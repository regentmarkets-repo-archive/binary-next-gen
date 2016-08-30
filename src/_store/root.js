import React, { PureComponent } from 'react';
import 'react-fastclick';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { trackRoute } from 'binary-utils/lib/Analytics';
import { store, rehydratedStorePromise, actions } from './persistentStore';
import routes from '../_routes';
import { tryAuth } from '../_data/Auth';
import * as LiveData from '../_data/LiveData';
import AppStateProvider from './AppStateProvider';
import BootProvider from './BootProvider';

const routerHistory = window.cordova ? hashHistory : browserHistory;
export const history = syncHistoryWithStore(routerHistory, store);

history.listen(location => trackRoute(location.pathname));

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

const emptyObject = {};


export const accountExclusion = async (token, accts = []) => {
    const account = window.BinaryBoot.accounts.find(x => x.account.startsWith('VRTC'));
    accts.push(token);
    if (account) {
        const newToken = account.token;
        await tryAuth(newToken);
    } else {
        const accounts = window.BinaryBoot.accounts.filter(x => !accts.includes(x.token));
        try {
            await tryAuth(accounts[0].token);
        } catch (ex) {
            if (ex.error && ex.error.error.code === 'SelfExclusion') {
                accountExclusion(accounts[0].token, accts);
            }
        }
    }
};

export default class Root extends PureComponent {

    async componentWillMount() {
        const reyhdratedStore = await rehydratedStorePromise();
        const state = reyhdratedStore.getState();

        await LiveData.connect(reyhdratedStore);
        const token = state.account.get('token');

        try {
            await tryAuth(token);
        } catch (e) {
            actions.updateAppState('authorized', false);
        } finally {
            actions.updateAppState('connected', true);
        }
    }

    createElementWithActions = (Element, props) => {
        if (!Object.keys(props.routeParams).length) { // eslint-disable-line react/prop-types
            props.routeParams = emptyObject; // eslint-disable-line react/prop-types
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
