import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Tab from '../Tab';

describe('<Tab />', () => {
    it('should render', () => {
        const wrapper = shallow(<Tab />);
        expect(wrapper).toExist();
    });

    it('should render the "text" property inside', () => {
        const wrapper = shallow(<Tab text="Hello"/>);
        expect(wrapper.text()).toEqual('Hello');
    });
});
