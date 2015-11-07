import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { NumberPlain, LanguagePicker } from '../_common';

@connect(state => ({ account: state.account }))
export default class DesktopHeader extends React.Component {
	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();

		return (
			<header>
		    	<div className="header-content">
					<Link id="logo" to="/workspace">
						<img src="https://borisyankov.github.io/binary-static/images/pages/binary-symbol-logo.svg" />
					</Link>
					19:28:33 (GMT +0)
					Balance: <NumberPlain currency={account.currency} value={account.balance} />
					Equity: <NumberPlain currency={account.currency} value={account.balance} />
					<LanguagePicker />
					{account.loginid} {account.email}
				</div>
			</header>
		);
	}
}

export default DesktopHeader;
