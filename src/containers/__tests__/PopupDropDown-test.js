import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PopupDropDown from '../PopupDropDown';

describe('<PopupDropDown />', () => {
    it('renders a drop down', () => {
        const wrapper = shallow(<PopupDropDown><div /></PopupDropDown>);
        expect(wrapper.find('AnimatedPopup')).to.have.length(1);
    });
});
