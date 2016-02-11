import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';
import Collapsible from '../Collapsible';

describe('Collapsible', () => {
	it('should render the same component as the Collapsible component', () => {
		const renderer = createRenderer();
		renderer.render(<Collapsible title="title">Hello</Collapsible>);
		const actualElement = renderer.getRenderOutput();
		const expectedElement = (
			<details>
				<summary>title</summary>
				Hello
			</details>
		);
		expect(expectedElement).toEqual(actualElement);
	});
});
