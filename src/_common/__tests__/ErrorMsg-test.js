import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ErrorMsg from '../ErrorMsg';

describe('<ErrorMsg />', () => {
    it('does not render when no properties provided', () => {
        const wrapper = shallow(<ErrorMsg />);
        expect(wrapper.type()).to.equal(null);
    });

    it('renders FormattedMessage', () => {
        const wrapper = shallow(<ErrorMsg className="someClass" text="some" />);
        expect(wrapper.props().className).to.include('someClass');
    });
});
