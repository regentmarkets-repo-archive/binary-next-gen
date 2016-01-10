import React from 'react';
import { addLocaleData } from 'react-intl';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { store } from './configureStore';
import { Router } from 'react-router';
import routes from '../_routes';
import IntlProviderContainer from '../_routes/IntlProviderContainer';
import HashHistory from 'history/lib/createHashHistory';
import ThemeProvider from '../_common/ThemeProvider';
import * as AllActions from '../_actions';

import { trackRoute } from '../_utils/Analytics';

const history = new HashHistory();
history.listen(location => trackRoute(location.pathname));

addLocaleData({
    locale: 'bg-bg',
    parentLocale: 'en',
});

export default class Root extends React.Component {
    createElementWithActions(Component, props) {
        return (
            <Component {...props} actions={bindActionCreators(AllActions, store.dispatch)}/>
        );
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProviderContainer>
                    <ThemeProvider>
                        <Router
                            history={history}
                            children={routes}
                            createElement={::this.createElementWithActions}
                        />
                    </ThemeProvider>
                </IntlProviderContainer>
            </Provider>
        );
    }
}
