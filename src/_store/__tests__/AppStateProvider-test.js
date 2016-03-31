import React from 'react';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import AppStateProvider from '../AppStateProvider';

describe('<AppStateProvider />', () => {
    const middlewares = []; // add your middlewares like `redux-thunk`
    const mockStore = configureStore(middlewares);

    it.skip('should show loadingview if not connected', () => {
        const ChildComponent = () => <div>Hello, World</div>;

        const getState = { appState: fromJS({ connected: false }) };
        const store = mockStore(getState, []);
        const testComponent =
            <AppStateProvider store={store}>
                <ChildComponent />
            </AppStateProvider>;

        const wrapper = shallow(testComponent);
        expect(wrapper.render().text()).to.contain('check connection');
    });

    it('should show children if connected, whether error or not', () => {
        const ChildComponent = () => <div>Hello, World</div>;

        const getState = { appState: fromJS({ connected: true }) };
        const store = mockStore(getState, []);
        const wrapper = shallow(
            <AppStateProvider store={store}>
                <ChildComponent />
            </AppStateProvider>);

        expect(wrapper.render().text()).to.not.include('check connection');
    });
});
