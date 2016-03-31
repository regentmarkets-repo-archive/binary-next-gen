import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('<Modal />', () => {
    it('renders a modal', () => {
        const wrapper = shallow(<Modal shown />);
        expect(wrapper.type()).to.equal('div');
    });

    it('renders nothing if shown is false', () => {
        const wrapper = shallow(<Modal shown={false} />);
        expect(wrapper.type()).to.equal(null);
    });
});
