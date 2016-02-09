import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Star from '../Star';

describe('Star', () => {
	it('should render img', () => {
		const wrapper = shallow(<Star on="true" />);
		expect(wrapper.nodes[0].type).toEqual('img');
	});

	it('returns star-on.svg', () => {
		const wrapper = shallow(<Star on="true" />);
		expect(wrapper.nodes[0].props.src).toEqual('img/star-on.svg');
	});

	it('has an image named star-off.svg', () => {
		const wrapper = shallow(<Star />);
		expect(wrapper.nodes[0].props.src).toEqual('img/star-off.svg');
	});
});
