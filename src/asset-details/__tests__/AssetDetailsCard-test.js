import React from 'react';
import { shallow } from 'enzyme';
import AssetDetailsCard from '../AssetDetailsCard';

describe('<AssetDetailsCard />', () => {
    it('should stil render if no asset is selected', () => {
        const wrapper = shallow(<AssetDetailsCard activeAsset={{}} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('should be able to render with only activeAsset property set', () => {
        const wrapper = shallow(<AssetDetailsCard activeAsset={{}} />);

        expect(wrapper.type()).toBeDefined();
    });

    it('should show trading times information if provided via props', () => {
        const tradingTimes = {
            times: {
                open: ['12:00:00'],
                close: ['11:59:59'],
            },
            events: [],
        };
        const wrapper = shallow(
            <AssetDetailsCard activeAsset={{}} tradingTimes={tradingTimes} />,
        );

        expect(wrapper.find('AssetDetailsTradingTimes')).toBeDefined();
    });
});
