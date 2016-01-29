import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import config from '../config';
import { Clock, LanguagePicker, NumberPlain } from '../_common';

@connect(state => ({ account: state.account }))
export default class DesktopHeader extends React.Component {
	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();

		return (
			<div id="header" className="inverse">
				<Link id="logo" to="/workspace">
					<img src={config.logo} />
				</Link>
				<Clock />
				<div style={{ flex: 1 }} />
				<LanguagePicker className="language-picker" />
				<span>{account.email}</span>
				<NumberPlain className="balance" currency={account.currency} value={account.balance} />
				<Link to="/deposit" id="deposit-btn" className="btn-secondary"><M m="Deposit" /></Link>
				<Link to="/signout" id="signout-btn" className="btn-secondary"><M m="Log out" /></Link>
			</div>
		);
	}
}

export default DesktopHeader;
