import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('Modal', () => {
    it('renders a modal', () => {
        const wrapper = shallow(<Modal />);
        expect(wrapper.type()).toBe('div');
    });

    it('renders empty div if shown is false', () => {
        const wrapper = shallow(<Modal shown={false} />);
        expect(wrapper.find('div').children().length).toBe(0);
    });
});
