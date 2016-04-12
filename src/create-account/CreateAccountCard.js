import React, { Component } from 'react';
import LogoSpinner from '../_common/LogoSpinner';
import EmailVerificationForm from './EmailVerificationForm';
import AccountInfoForm from './AccountInfoForm';

export default class CreateAccountCard extends Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		createAccount: React.PropTypes.object.isRequired,
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
