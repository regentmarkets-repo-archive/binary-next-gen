import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SelectGroup from '../SelectGroup';

describe('<SelectGroup />', () => {
    it('renders with no properties', () => {
        const wrapper = shallow(<SelectGroup />);
        expect(wrapper.type()).to.equal('fieldset');
    });

    it('passes className to fieldset', () => {
        const wrapper = shallow(<SelectGroup className="test-class" />);
        expect(wrapper.props().className).to.equal('test-class');
    });

    it('passes id to select', () => {
        const wrapper = shallow(<SelectGroup id="test-id" />);
        expect(wrapper.find('select').props().id).to.equal('test-id');
    });
});
