import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Tab from '../Tab';

describe('<Tab />', () => {
    it('should render', () => {
        const wrapper = shallow(<Tab />);
        expect(wrapper).to.be.ok;
    });

    it('should render the "text" property inside', () => {
        const wrapper = shallow(<Tab text="Hello" />);
        expect(wrapper.text()).to.equal('Hello');
    });

    it('should not render "text" property if showText is false', () => {
        const wrapper = shallow(<Tab text="Hello" showText={false} />);
        expect(wrapper.text()).to.equal('');
    });

    it('should render "text" property if showText is false', () => {
        const wrapper = shallow(<Tab imgSrc="example.com/img.png" />);
        expect(wrapper.find('img')).to.have.length(1);
    });
});
