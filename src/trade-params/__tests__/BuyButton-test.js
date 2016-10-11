import React from 'react';
import { shallow } from 'enzyme';
import BuyButton from '../BuyButton';

describe('<BuyButton />', () => {
    it('should be able to be rendered with no Parameters', () => {
        expect(() => <BuyButton />).not.toThrow();
    });

    it('should not show price of contract', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.find('NumberPlain').length).toEqual(0);
    });

    it('should disable the button if no ask price is provided', () => {
        const wrapper = shallow(<BuyButton />).children();
        expect(wrapper.props().disabled).toBeTruthy();
    });

    it('should disable the button if disabled property is set', () => {
        const wrapper = shallow(<BuyButton disabled askPrice={123} />).children();
        expect(wrapper.props().disabled).toBeTruthy();
    });
});
