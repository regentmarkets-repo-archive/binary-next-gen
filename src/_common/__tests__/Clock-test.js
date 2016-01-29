import React from 'react';
import expect from 'expect';
import { shallow,render } from 'enzyme';
import { FormattedTime } from 'react-intl';
import Clock from '../Clock';

describe('Clock',()=>{
	const wrapper = shallow(<Clock time={ new Date()}> </Clock>);
    const time = new Date(wrapper.node.props.value);
	it("The day is Today's day ",()=>{
		expect(time.getDate()).toEqual((new Date()).getDate());
	});
	it("The hour is the same as the current hour ",()=>{
		expect(time.getHours()).toEqual((new Date()).getHours());
	});
	it("The minutes are the same ",()=>{
		expect(time.getMinutes()).toEqual((new Date()).getMinutes());
	});
});