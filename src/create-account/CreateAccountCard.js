import React from 'react';
import EmailVerificationForm from './EmailVerificationForm';
import AccountInfoForm from './AccountInfoForm';

export default class CreateAccountCard extends React.Component {
	static propTypes = {
		createAccount: React.PropTypes.object.isRequired,
	};

	render() {
		const { createAccount } = this.props;
		return (
			createAccount.get('step') === 1 ?
				<EmailVerificationForm {...this.props} /> :
				<AccountInfoForm {...this.props} />
		);
	}
}
