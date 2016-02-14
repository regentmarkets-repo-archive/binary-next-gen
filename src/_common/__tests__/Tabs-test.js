import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Tabs from '../Tabs';

describe('Tabs', () => {
    it('renders correctly with no properties', () => {
        const wrapper = shallow(<Tabs />);
        expect(wrapper.type()).to.equal('div');
    });

    it('className passed to it is set to the wrapper div', () => {
        const wrapper = shallow(<Tabs className="test-class" />);
        expect(wrapper.props().className).to.equal('test-class');
    });

    it('style passed to it is set to the wrapper div', () => {
        const style = { width: '100%' };
        const wrapper = shallow(<Tabs style={style} />);
        expect(wrapper.props().style).to.equal(style);
    });
});
