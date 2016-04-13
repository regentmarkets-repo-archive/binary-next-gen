import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TabList from '../TabList';

describe('<TabList />', () => {
    it('should render', () => {
        const wrapper = shallow(<TabList />);
        expect(wrapper).to.be.ok;
    });

    it('should render a single item if contained', () => {
        const wrapper = shallow(<TabList>Hello</TabList>);
        expect(wrapper.nodes).to.have.lengthOf(1);
    });

    it('should render as many children as contained', () => {
        const wrapper = shallow(
            <TabList>
                <span />
                <span />
                <span />
            </TabList>
        );
        expect(wrapper.find('span')).to.have.lengthOf(3);
    });

    it('should set at least one child to selected', () => {
        const wrapper = shallow(
            <TabList>
                <span />
            </TabList>
        );
        expect(wrapper.find('span[selected]')).to.have.lengthOf(1);
    });
});
