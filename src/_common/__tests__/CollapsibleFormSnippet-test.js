import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import CollapsibleFormSnippet from '../CollapsibleFormSnippet';

describe('CollapsibleFormSnippet', ()=>{
	it('works', ()=>{
		let renderer =  createRenderer();
		renderer.render(<CollapsibleFormSnippet click={() => {}}>label<span>Hello</span></CollapsibleFormSnippet>) ;
		let actualElement = renderer.getRenderOutput();
		let expectedElement = (<fieldset className="snippet collapsible">
                				<legend className="focusable form-label" onClick={() => {}}>label</legend>
                					<div><span>Hello</span></div>
            				    </fieldset>);
		console.log("the actualElement is", actualElement);
		console.log("the expectedElement is ", expectedElement);

		expect(actualElement).toEqual(expectedElement);
	});
})