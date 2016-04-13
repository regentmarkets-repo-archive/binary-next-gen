import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RadioItem from '../RadioItem';

describe('<RadioItem />', () => {
    it('renders with no properties', () => {
        const wrapper = shallow(<RadioItem />);
        expect(wrapper.type()).to.equal('span');
    });

    it('renders a label even if no properties', () => {
        const wrapper = shallow(<RadioItem />);
        expect(wrapper.find('label')).to.have.lengthOf(1);
    });
});
