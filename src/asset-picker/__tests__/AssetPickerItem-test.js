import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AssetPickerItem from '../AssetPickerItem';

describe('AssetPickerItem', () => {
    it('should be able to be instantiated', () => {
        expect(() => <AssetPickerItem />).to.not.throw();
    });

    it('should have a class applied if the market is closed', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isOpen: false }}/>);
        expect(wrapper.props().className).to.contain('market-closed');
    });

    it('should not have a class applied if the market is open', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isOpen: true }}/>);
        expect(wrapper.props().className).to.not.contain('market-closed');
    });

    it('should show an off star if item is not in watch list', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isInWatchlist: false }}/>);
        expect(wrapper.find('Star').props().on).to.equal(false);
    });

    it('should show an on star if item is in watch list', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isInWatchlist: true }}/>);
        expect(wrapper.find('Star').props().on).to.equal(true);
    });

    it('should not show a button in compact mode', () => {
        const wrapper = shallow(<AssetPickerItem compact />);
        expect(wrapper.find('button')).to.have.length(0);
    });
});
