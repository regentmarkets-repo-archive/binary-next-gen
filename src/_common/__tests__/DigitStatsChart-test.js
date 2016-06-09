import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DigitStatsChart from '../DigitStatsChart';

describe('<DigitStatsChart />', () => {
    it('renders with an empty stats property', () => {
        const wrapper = shallow(<DigitStatsChart stats={[]} />);
        expect(wrapper.type()).to.equal('div');
    });

    it('renders with an 10 length stats property', () => {
        const stats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const wrapper = shallow(<DigitStatsChart stats={stats} />);
        expect(wrapper.type()).to.equal('div');
    });
});
