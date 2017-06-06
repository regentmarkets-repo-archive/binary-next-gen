import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../Modal';

describe('<Modal />', () => {
    it('renders a modal', () => {
        const wrapper = shallow(<Modal shown />);
        expect(wrapper.find('AnimatedPopup').length).toEqual(1);
    });
});
