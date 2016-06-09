import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Info from '../Info';

describe('<Info />', () => {
    it('renders only icon when no tooltip is provided', () => {
        const wrapper = shallow(<Info />);
        expect(wrapper.find('img')).to.have.length(1);
        expect(wrapper.find('.tooltip')).to.have.length(0);
    });

    it('renders tooltip when given', () => {
        const wrapper = shallow(<Info tooltip="some tooltip" />);
        expect(wrapper.find('.tooltip')).to.have.length(1);
    });
});
