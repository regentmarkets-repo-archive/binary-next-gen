import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Resizer from '../Resizer';

describe('Resizer', ()=>{
	it('should contain the class myClass',()=>{
		const wrapper = shallow(<Resizer className="myClass" onResize = {() => {}} />)
		expect(wrapper.props().className).toEqual('myClass');
	});
});