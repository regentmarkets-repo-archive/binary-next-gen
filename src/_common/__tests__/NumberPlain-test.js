import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NumberPlain from '../NumberPlain';

describe('NumberPlain', () => {
    it('renders without any properties', () => {
        const wrapper = shallow(<NumberPlain />);
        expect(wrapper.type()).toBe('span');
    });

    it('passes className to span', () => {
        const output = shallow(<NumberPlain className="test-class" />);
        expect(output.props().className).toBe('test-class');
    });

    it('not passing a value still renders a span', () => {
        const wrapper = shallow(<NumberPlain />);
        expect(wrapper.find('span').length).toBe(1);
    });
});
