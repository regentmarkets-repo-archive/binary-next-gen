import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AssetPickerHeader from '../AssetPickerHeader';

describe('<AssetPickerHeader />', () => {
    it('should be able to be instantiated', () => {
        expect(() => <AssetPickerHeader />).to.not.throw();
    });

    it('should show submarket always', () => {
        const wrapper = shallow(<AssetPickerHeader submarket="some-submarket" />);
        expect(wrapper.text()).to.contain('some-submarket');
    });

    it('should show market if showMarket is true', () => {
        const wrapper = shallow(<AssetPickerHeader market="some-market" showMarket />);
        expect(wrapper.text()).to.contain('some-market');
    });
});
