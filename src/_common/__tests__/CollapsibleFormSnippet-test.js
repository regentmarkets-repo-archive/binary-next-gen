import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import { shallow,render } from 'enzyme';
import CollapsibleFormSnippet from '../CollapsibleFormSnippet';

describe('CollapsibleFormSnippet', ()=>{

	const wrapper =  shallow(<CollapsibleFormSnippet label="label">label<span>Hello</span>
					</CollapsibleFormSnippet>) ;
	
	it('it contains the text Hello', ()=>{
		expect(wrapper.contains('Hello')).toEqual(true);
	});
	it('has the child Hello',()=>{
		expect(wrapper.children().contains('Hello')).toEqual(true);
	});
	it('has the child label',()=>{
		expect(wrapper.children().contains('label')).toEqual(true);
	});
	it('has the node collapsible',()=>{
		expect(wrapper.contains('.collapsible')).toEqual(true);
	});
})