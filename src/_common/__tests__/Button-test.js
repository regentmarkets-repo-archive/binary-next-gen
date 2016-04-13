import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('<Button />', () => {
    it('renders even whithout properties', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.type()).to.not.equal(null);
    });

    it('renders FormattedMessage', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.find('FormattedMessage')).to.have.lengthOf(1);
    });
});
