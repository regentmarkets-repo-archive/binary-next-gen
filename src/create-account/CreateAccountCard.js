import React, { Component, PropTypes } from 'react';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import EmailVerificationForm from './EmailVerificationForm';
import AccountInfoForm from './AccountInfoForm';

export default class CreateAccountCard extends Component {

	static propTypes = {
		createAccount: PropTypes.object.isRequired,
	};

	render() {
		const { createAccount } = this.props;
		const { progress, step } = createAccount;

		return (
			<div>
				<p className="media">
					<LogoSpinner spinning={progress} />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</p>
				{step === 1 ?
					<EmailVerificationForm {...createAccount} /> :
					<AccountInfoForm {...createAccount} />
				}
			</div>
		);
	}
}
