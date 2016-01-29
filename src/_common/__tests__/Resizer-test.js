import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import { shallow,render } from 'enzyme';
import Resizer from '../Resizer';

describe('Resizer', ()=>{
	let wrapper = shallow(<Resizer className="myClass" onResize = {() => {}} />)

	it('The className is myClass',()=>{
		expect(wrapper.props().className).toEqual('myClass');
	});
});