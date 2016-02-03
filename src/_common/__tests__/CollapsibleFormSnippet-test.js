import React from 'react';
import expect from 'expect';
import { shallow, render } from 'enzyme';
import CollapsibleFormSnippet from '../CollapsibleFormSnippet';

describe('CollapsibleFormSnippet', ()=>{
	it('should contain the child label',()=>{
		const wrapper =  shallow(
			<CollapsibleFormSnippet label="label">
				label<span>Hello</span>
			</CollapsibleFormSnippet>
		);
		expect(wrapper.children().contains('label')).toEqual(true);
	});
	it('contains the children node',()=>{
		const wrapper =  shallow(
			<CollapsibleFormSnippet label="label" show>
				label<span>Hello</span>
			</CollapsibleFormSnippet>
		);
		expect(wrapper.contains(<span>Hello</span>)).toEqual(true);
	});
});
