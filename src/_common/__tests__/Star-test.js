import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import { shallow,render } from 'enzyme';
import Star from '../Star';

describe('Star',()=>{

	let wrapper = shallow(<Star on="true" />)
	it('The first node is of type img', ()=>{
		expect(wrapper.nodes[0].type).toEqual('img');
	});
	it('The image name is star-on.svg', ()=>{
		expect(wrapper.nodes[0].props.src).toEqual('img/star-on.svg');
	});
	let wrap = shallow(<Star />);
	it('The image name is star-off.svg', ()=>{
		expect(wrap.nodes[0].props.src).toEqual('img/star-off.svg');
	});
})