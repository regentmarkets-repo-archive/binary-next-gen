import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Direction from '../Direction';

describe('<Direction />', () => {
    it('renders without any properties', () => {
        const wrapper = shallow(<Direction />);
        expect(wrapper.type()).to.equal('svg');
    });

    it('renders when direction is negative', () => {
        const wrapper = shallow(<Direction direction={-1} />);
        expect(wrapper.type()).to.equal('svg');
    });

    it('renders when direction is positive', () => {
        const wrapper = shallow(<Direction direction={1} />);
        expect(wrapper.type()).to.equal('svg');
    });
});
