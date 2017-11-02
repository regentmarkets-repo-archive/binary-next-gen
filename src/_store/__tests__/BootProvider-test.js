import React from 'react';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import { shallow, mount } from 'enzyme';
import BootProvider from '../BootProvider';

describe('<BootProvider />', () => {
    const ChildComponent = () => <div>Hello, World</div>;
    const middlewares = []; // add your middlewares like `redux-thunk`
    const mockStore = configureStore(middlewares);
    const getState = { boot: fromJS({ theme: 'dark', language: 'EN' }) };
    const store = mockStore(getState, []);

    it('should render children', () => {
        const wrapper = shallow(
            <BootProvider store={store}>
                <ChildComponent />
            </BootProvider>);

        expect(wrapper.render().text()).toContain('World');
    });

    it('should render theme-wrapper', () => {
        const wrapper = mount(
            <BootProvider store={store}>
                <ChildComponent />
            </BootProvider>);
        expect(wrapper.find('#theme-wrapper').hostNodes().hasClass('inverse')).toBeTruthy();
    });
});
