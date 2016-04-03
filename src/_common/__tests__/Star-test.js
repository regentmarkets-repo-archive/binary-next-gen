import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Star from '../Star';

describe('<Star />', () => {
	it('should render img', () => {
		const wrapper = shallow(<Star on />);
		expect(wrapper.nodes[0].type).to.equal('img');
	});

	it('returns star-on.svg', () => {
		const wrapper = shallow(<Star on />);
		expect(wrapper.nodes[0].props.src).to.equal('img/star-on.svg');
	});

	it('has an image named star-off.svg', () => {
		const wrapper = shallow(<Star />);
		expect(wrapper.nodes[0].props.src).to.equal('img/star-off.svg');
	});
});
