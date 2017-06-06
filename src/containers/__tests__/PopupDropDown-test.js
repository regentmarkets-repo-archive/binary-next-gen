import React from 'react';
import { shallow } from 'enzyme';
import PopupDropDown from '../PopupDropDown';

describe('<PopupDropDown />', () => {
    it('renders a drop down', () => {
        const wrapper = shallow(<PopupDropDown><div /></PopupDropDown>);
        expect(wrapper.find('AnimatedPopup').length).toEqual(1);
    });
});
