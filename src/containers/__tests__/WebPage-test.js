import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import WebPage from '../WebPage';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';

const middlewares = []; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const getState = { appState: fromJS({ isAuthorized: true }) };
const store = mockStore(getState, []);

describe('<WebPage />', () => {
    it('should render WebPage component', () => {
        const wrapper = shallow(
            <WebPage store={store} isAuthorized="true">
                <span>Hello</span>
            </WebPage>
        );
        expect(wrapper.children().text()).to.contain('Hello');
    });
});
