import React from 'react';
import { shallow } from 'enzyme';
import SetCurrencyCard from '../SetCurrencyCard';

describe('<SetCurrencyCard />', () => {
    const PROPS = {
        account: {},
    };

    it('Component should be rendered', () => {
        const wrapper = shallow(<SetCurrencyCard {...PROPS} />);

        expect(wrapper.type()).toBeDefined();
    });
});
