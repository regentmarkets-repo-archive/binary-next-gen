import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import LogoSpinner from '../LogoSpinner';

describe('LogoSpinner', () => {
    it('renders image element', () => {
        const wrapper = shallow(<LogoSpinner />);
        expect(wrapper.type()).toBe('img');
    });

    it('is static (no classes applied) if spinning is false', () => {
        const wrapper = shallow(<LogoSpinner spinning={false} />);
        expect(wrapper.props().className).toBe('');
    });

    it('is animated (via a class) if spinning is true', () => {
        const wrapper = shallow(<LogoSpinner spinning />);
        expect(wrapper.props().className).toBe('spinner');
    });
});
