import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import M from '../M';

describe('<M />', () => {
    it('renders even whithout properties', () => {
        const wrapper = shallow(<M />);
        expect(wrapper.type()).to.not.equal(null);
    });

    it('renders FormattedMessage', () => {
        const wrapper = shallow(<M />);
        expect(wrapper.find('FormattedMessage')).to.have.lengthOf(1);
    });
});
