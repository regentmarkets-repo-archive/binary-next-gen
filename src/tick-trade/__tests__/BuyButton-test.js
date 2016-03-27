import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BuyButton from '../BuyButton';

describe('BuyButton', () => {
    it('should be able to be rendered with no Parameters', () => {
        expect(() => <BuyButton />).to.not.throw();
    });

    it('should show price of contract if provided', () => {
        const wrapper = shallow(<BuyButton askPrice={123} />);
        expect(wrapper.find('NumberPlain')).to.have.length(1);
    });

    it('should not show price of contract if none is provided', () => {
        const wrapper = shallow(<BuyButton />);
        expect(wrapper.find('NumberPlain')).to.have.length(0);
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
