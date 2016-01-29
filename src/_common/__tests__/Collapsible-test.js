import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import Collapsible  from '../Collapsible';

describe('Collapsible', ()=>{
	it('works', ()=>{
		let renderer = createRenderer();
		renderer.render(<Collapsible title="title">HEllo</Collapsible>);
		let actualElement =	renderer.getRenderOutput();
		let expectedElement = (<details>
                				<summary>title</summary>
              						HEllo
           					   </details>);

	    expect(actualElement).toEqual(expectedElement);            			
	});
});