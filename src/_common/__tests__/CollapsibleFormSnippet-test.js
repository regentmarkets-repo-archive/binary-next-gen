import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import CollapsibleFormSnippet from '../CollapsibleFormSnippet';

describe('CollapsibleFormSnippet', ()=>{
	it('should contain the text Hello', ()=>{
		const wrapper =  shallow(<CollapsibleFormSnippet label="label">label<span>Hello</span>
					</CollapsibleFormSnippet>) ;
		expect(wrapper.contains('Hello')).toEqual(true);
	});
	it('should contain the child label',()=>{
		const wrapper =  shallow(<CollapsibleFormSnippet label="label">label<span>Hello</span>
					</CollapsibleFormSnippet>) ;
		expect(wrapper.children().contains('label')).toEqual(true);
	});
	it('contains the node collapsible',()=>{
		const wrapper =  shallow(<CollapsibleFormSnippet label="label">label<span>Hello</span>
					</CollapsibleFormSnippet>) ;
		expect(wrapper.contains('.collapsible')).toEqual(true);
	});
})
