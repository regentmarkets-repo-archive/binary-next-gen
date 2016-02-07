import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import DesktopPage from '../DesktopPage';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';

const middlewares = []; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const getState = { appState: fromJS({ isAuthorized: true }) };
const store = mockStore(getState, []);

describe('DesktopPage', () => {
    it('should render DesktopPage component', () => {
        const wrapper = shallow(
            <DesktopPage store={store} isAuthorized="true">
                <span>Hello</span>
            </DesktopPage>
        );
        expect(wrapper.children().text()).toContain('Hello');
    });
});
