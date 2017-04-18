import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import WebPage from '../WebPage';

const middlewares = []; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const getState = { appState: fromJS({ isAuthorized: true }) };
const store = mockStore(getState, []);

describe('<WebPage />', () => {
    it('should render WebPage component', () => {
        const wrapper = shallow(
            <WebPage store={store} isAuthorized="true">
                <span>Hello</span>
            </WebPage>,
        );
        expect(wrapper.children().text()).toContain('Hello');
    });
});
