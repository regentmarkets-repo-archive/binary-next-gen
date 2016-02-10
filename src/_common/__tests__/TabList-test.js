import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import TabList from '../TabList';

describe('<TabList />', () => {
    it('should render', () => {
        const wrapper = shallow(<TabList />);
        expect(wrapper).toExist();
    });

    it('should render a single item if contained', () => {
        const wrapper = shallow(<TabList>Hello</TabList>);
        expect(wrapper.nodes.length).toBe(1);
    });

    it('should render as many children as contained', () => {
        const wrapper = shallow(
            <TabList>
                <span />
                <span />
                <span />
            </TabList>
        );
        expect(wrapper.find('span').length).toBe(3);
    });

    it('should set at least one child to selected', () => {
        const wrapper = shallow(
            <TabList>
                <span />
            </TabList>
        );
        expect(wrapper.find('span[selected]').length).toBe(1);
    });
});
