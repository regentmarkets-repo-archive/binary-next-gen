import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NumberColored from '../NumberColored';

describe('NumberColored',()=>{
	it('should contain the class number-positive ', ()=>{
		const wrapper = shallow(<NumberColored value='3' currency='USD' isProfit={ (v)=> { return v= 3} } />);
		expect(wrapper.node.props.className).toEqual('number-positive');
	});

	it('should contain the class number-negative ',()=>{
		const wrapper = shallow(<NumberColored value='3' currency='USD' isProfit={ (v)=> { return v= -1} } />);
		expect(wrapper.node.props.className).toEqual('number-negative');

	});
});