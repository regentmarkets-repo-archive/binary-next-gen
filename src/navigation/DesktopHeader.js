import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { M, LanguagePicker } from '../_common';
import { FormattedNumber } from 'react-intl';

@connect(state => ({ account: state.account }))
export default class DesktopHeader extends React.Component {
	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	// onLanguageChange(event) {
	//	this.props.actions.signinFieldUpdate('language', event.target.value);
	//	LiveData.api.changeLanguage(event.target.value);
	// }

	render() {
		const account = this.props.account.toJS();

		return (
			<div id="header">
				<Link id="logo" to="/workspace">
					<img src="https://borisyankov.github.io/binary-static/images/pages/binary-symbol-logo.svg" />
				</Link>
				<span>19:28:33 (GMT +0)</span>
				<span>
					<M m="Balance" />&nbsp;
					<FormattedNumber style="currency" currency={account.currency} value={account.balance} />
				</span>
				<LanguagePicker />
				<span>{account.loginid}</span>
				<span>{account.email}</span>
			</div>
		);
	}
}

export default DesktopHeader;
