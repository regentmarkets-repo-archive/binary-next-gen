import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import BuyButton from '../BuyButton';

describe('AssetPickerHeader', () => {
    it('should be able to be rendered with no Parameters', () => {
        expect(() => <BuyButton />).toNotThrow();
    });

    it('should show price of contract if provided', () => {
        const wrapper = shallow(<BuyButton askPrice={123} />);
        expect(wrapper.find('NumberPlain').length).toBe(1);
    });

    it('should not show price of contract if none is provided', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.find('NumberPlain').length).toBe(0);
    });

    it('should disable the button if no ask price is provided', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.props().disabled).toBe(true);
    });

    it('should disable the button if disabled property is set', () => {
        const wrapper = shallow(<BuyButton disabled askPrice={123} />);
        expect(wrapper.props().disabled).toBe(true);
    });
});
