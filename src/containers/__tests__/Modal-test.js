import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('<Modal />', () => {
    it('renders a modal', () => {
        const wrapper = shallow(<Modal shown />);
        expect(wrapper.find('ReactCSSTransitionGroup')).to.have.length(1);
    });
});
