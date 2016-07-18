import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import WebSidebar from './WebSidebar';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class WebSidebarContainer extends PureComponent {

	static propTypes = {
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid } = this.props;

		return (
			<div>
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer" />
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					{loginid}
					<WebSidebar {...immutableChildrenToJS(this.props)} />
				</label>
			</div>
		);
	}
}