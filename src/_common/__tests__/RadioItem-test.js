import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import RadioItem from '../RadioItem';

describe('RadioItem', () => {
    it('renders with no properties', () => {
        const wrapper = shallow(<RadioItem />);
        expect(wrapper.type()).toBe('span');
    });

    it('renders a label even if no properties', () => {
        const wrapper = shallow(<RadioItem />);
        expect(wrapper.find('label').length).toBe(1);
    });
});
