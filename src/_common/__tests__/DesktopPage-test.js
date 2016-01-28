import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import DesktopPage  from '../DesktopPage';
import { DesktopHeader } from '../navigation';

describe('DesktopPage',()=>{
	it('works',()=>{
		let renderer = createRenderer();
		renderer.renderer(<DesktopPage isAuthorized="true"><span>Hello</span></DesktopPage>);
		let actualElement = renderer.getRenderOutput();
		let expectedElement = (<div className="desktop-page">
									<DesktopHeader />
									<div className="desktop-content">
										<span>Hello</span>
									</div>
							    </div>);
		expect(actualElement).toEqual(expectedElement);
	});
});