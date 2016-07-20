import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DropDown from '../DropDown';

describe('<DropDown />', () => {
    it('renders a drop down', () => {
        const wrapper = shallow(<DropDown />);
        expect(wrapper.find('ReactCSSTransitionGroup')).to.have.length(1);
    });
});
