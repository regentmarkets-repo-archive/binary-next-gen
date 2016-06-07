import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BuyButton from '../BuyButton';

describe('<BuyButton />', () => {
    it('should be able to be rendered with no Parameters', () => {
        expect(() => <BuyButton />).to.not.throw();
    });

    it('should not show price of contract', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.find('NumberPlain')).to.have.lengthOf(0);
    });

    it('should disable the button if no ask price is provided', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.props().disabled).to.be.true;
    });

    it('should disable the button if disabled property is set', () => {
        const wrapper = shallow(<BuyButton disabled askPrice={123} />);
        expect(wrapper.props().disabled).to.be.true;
    });
});
