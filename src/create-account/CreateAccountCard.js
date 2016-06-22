import React, { Component, PropTypes } from 'react';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import EmailVerificationForm from './EmailVerificationForm';
import AccountInfoForm from './AccountInfoForm';

export default class CreateAccountCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		createAccount: PropTypes.object.isRequired,
	};

	render() {
		const { actions, createAccount } = this.props;
		const { progress, step } = createAccount;

		return (
			<div>
				<p className="media">
					<LogoSpinner spinning={progress} />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</p>
				{step === 1 ?
					<EmailVerificationForm actions={actions} {...createAccount} /> :
					<AccountInfoForm actions={actions} {...createAccount} />
				}
			</div>
		);
	}
}
