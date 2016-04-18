import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import WebSidebar from './WebSidebar';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class MobileSidebar extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid } = this.props;

		return (
			<div>
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					{loginid}
					<WebSidebar />
				</label>
			</div>
		);
	}
}
