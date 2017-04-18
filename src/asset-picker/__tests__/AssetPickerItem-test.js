import React from 'react';
import { shallow } from 'enzyme';
import AssetPickerItem from '../AssetPickerItem';

describe('<AssetPickerItem />', () => {
    it('can be instantiated', () => {
        expect(() => <AssetPickerItem />).not.toThrow();
    });

    it('should render a compoennt that indicates open/close state', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isOpen: false }} />);
        expect(wrapper.find('OpenCloseNotice').length).toEqual(1);
    });

    it('should have an indicator that shows if the market is open', () => {
        const wrapper = shallow(<AssetPickerItem asset={{ isOpen: true }} />);
        expect(wrapper.find('OpenCloseNotice').props().isOpen).toEqual(true);
    });

    it.skip('should show an off star if item is not in watch list', () => {
        const wrapper = shallow(
            <AssetPickerItem asset={{ isInWatchlist: false }} />,
        );
        expect(wrapper.find('StarBorder').length).toEqual(1);
    });

    it.skip('should show an on star if item is in watch list', () => {
        const wrapper = shallow(
            <AssetPickerItem asset={{ isInWatchlist: true }} />,
        );
        expect(wrapper.find('Star').length).toEqual(1);
    });

    it('should not show a button in compact mode', () => {
        const wrapper = shallow(<AssetPickerItem />);
        expect(wrapper.find('button').length).toEqual(0);
    });
});
