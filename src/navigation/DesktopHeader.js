import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import config from '../config';
import { Clock, LanguagePicker, NumberPlain, M } from '../_common';
import { MobileSidebar } from './';

@connect(state => ({ account: state.account }))
export default class DesktopHeader extends React.Component {
	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();

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
				<LanguagePicker className="language-picker" />
				<NumberPlain className="balance" currency={account.currency} value={account.balance} />
				<Link to="/deposit" id="deposit-btn" className="btn-secondary"><M m="Deposit" /></Link>
			</div>
		);
	}
}

export default DesktopHeader;
