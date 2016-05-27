import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import MobileSidebar from './MobileSidebar';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class WebSidebarContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div>
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer" />
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					<MobileSidebar {...immutableChildrenToJS(this.props)} />
				</label>
			</div>
		);
	}
}
