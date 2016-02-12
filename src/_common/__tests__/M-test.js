import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import M from '../M';

describe('M', () => {
    it('renders even whithout properties', () => {
        const wrapper = shallow(<M />);
        expect(wrapper.type()).toNotBe(null);
    });

    it('renders FormattedMessage', () => {
        const wrapper = shallow(<M />);
        expect(wrapper.find('FormattedMessage').length).toBe(1);
    });
});
