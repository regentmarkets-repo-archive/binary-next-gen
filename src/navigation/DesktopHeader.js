import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import config from '../config';
import { Clock, LanguagePicker, M } from '../_common';
import { MobileSidebar, ToggleButtons, Balance } from './';

export default class DesktopHeader extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
	};

	render() {
		return (
			<div id="header" className="inverse">
				<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
				<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
				<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
				<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
					<img src="img/menu.svg" />
					<MobileSidebar />
				</label>
				<div id="logo">
					<img src={config.logo} />
					<img src={config.logo2} />
				</div>
				<div id="clock">
					<Clock />
				</div>
				<ToggleButtons actions={this.props.actions} />
				<LanguagePicker className="language-picker" />
				<Balance />
				<Link to="/deposit" id="deposit-btn" className="btn-secondary">
					<M m="Deposit" />
				</Link>
			</div>
		);
	}
}
