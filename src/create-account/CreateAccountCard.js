import React from 'react';
import LogoSpinner from '../_common/LogoSpinner';
import EmailVerificationForm from './EmailVerificationForm';
import AccountInfoForm from './AccountInfoForm';

export default class CreateAccountCard extends React.Component {
	static propTypes = {
		createAccount: React.PropTypes.object.isRequired,
	};

	render() {
		const { createAccount } = this.props;
		const { progress } = createAccount.toJS();
		return (
			<div>
				<p className="media">
					<LogoSpinner spinning={progress}/>
					<img className="logo-text" src="img/binary-type-logo.svg" />
				</p>
				{createAccount.get('step') === 1 ?
					<EmailVerificationForm {...this.props} /> :
					<AccountInfoForm {...this.props} />
				}
			</div>
		);
	}
}
