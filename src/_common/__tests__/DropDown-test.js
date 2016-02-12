import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import DropDown from '../DropDown';

describe('DropDown', () => {
    it('renders a drop down', () => {
        const wrapper = shallow(<DropDown />);
        expect(wrapper.type()).toEqual('div');
    });
});
