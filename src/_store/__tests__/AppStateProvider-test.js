import React from 'react';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import { shallow, render } from 'enzyme';
import AppStateProvider from '../AppStateProvider';

describe('<AppStateProvider />', () => {
    const middlewares = []; // add your middlewares like `redux-thunk`
    const mockStore = configureStore(middlewares);

    it('should show loadingview if not connected', () => {
        const getState = { appState: fromJS({ connected: false }) };
        const store = mockStore(getState, []);
        const testComponent = (
            <AppStateProvider store={store} connected>
                <div>Hello, World</div>
            </AppStateProvider>
        );

        const wrapper = render(testComponent);
        expect(wrapper.find('.loading-page').length).toEqual(1);
    });

    it('should show children if connected, whether error or not', () => {
        const ChildComponent = () => <div>Hello, World</div>;

        const getState = { appState: fromJS({ connected: true }) };
        const store = mockStore(getState, []);
        const wrapper = shallow(
            <AppStateProvider store={store}>
                <ChildComponent />
            </AppStateProvider>,
        );

        expect(wrapper.render().text()).not.toContain('check connection');
    });
});
