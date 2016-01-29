import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import { shallow,render } from 'enzyme';
import NumberColored from '../NumberColored';

describe('NumberColored',()=>{
	const wrapper = shallow(<NumberColored value='3' currency='USD' isProfit={ (v)=> { return v= 3} } />);
	const ele = shallow(<NumberColored value='3' currency='USD' isProfit={ (v)=> { return v= -1} } />);

	it('The class name is number-positive', ()=>{
		expect(wrapper.node.props.className).toEqual('number-positive');
	});

	it('The class is number-negative',()=>{
		expect(ele.node.props.className).toEqual('number-negative');

	})
});