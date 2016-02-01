import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Clock from '../Clock';

describe('Clock',()=>{
	it("should display day as today's day ",()=>{
		const wrapper = shallow(<Clock time={ new Date()}> </Clock>);
    	const time = new Date(wrapper.node.props.value);
		expect(time.getDate()).toEqual((new Date()).getDate());
	});
	
	it("should display the current time's hour ",()=>{
		const wrapper = shallow(<Clock time={ new Date()}> </Clock>);
		const time = new Date(wrapper.node.props.value);
		expect(time.getHours()).toEqual((new Date()).getHours());
	});
});