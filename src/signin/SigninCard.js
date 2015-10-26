import React from 'react';
import LogoSpinner from '../_common/LogoSpinner';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import LanguagePicker from '../_common/LanguagePicker';
import LiveData from '../_data/LiveData';

export default class SigninCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		history: React.PropTypes.object.isRequired,
		signin: React.PropTypes.object.isRequired,
	};

	// validate() {
	// 	const emailNotValid = !isValidEmail(this.state.email);
	// 	const passwordNotEntered = this.state.password.length === 0;
	//
	// 	// actions.validation
	// 	this.setState({
	// 		validatedOnce: true,
	// 		emailNotValid,
	// 		passwordNotEntered,
	// 	});
	// }

	// trySignin() {
	// 	this.validate();
	//
	// 	if (!(this.state.emailNotValid || this.state.passwordNotEntered)) {
	// 		this.performLogin();
	// 	}
	// }

	onTokenChange(event) {
		this.props.actions.signinFieldUpdate('token', event.target.value);
	}

	onLanguageChange(event) {
		this.props.actions.signinFieldUpdate('language', event.target.value);
	}

	trySignin() {
		this.props.actions.signinFieldUpdate('progress', true);
		LiveData.instance().api.authorize(this.props.signin.get('token')).then(
			() => {
				LiveData.instance().initAuthorized();
				this.props.history.pushState({}, 'tick-trade');
			}, () => {
				this.props.actions.signinFailed();
			});
	}

	// <InputGroup type="email" placeholder="Email" onChange={::this.emailChange} />
	// <ErrorMsg shown={validatedOnce && emailNotValid} text="You need to enter an email" />
	// <InputGroup type="password" placeholder="Password" onChange={::this.passwordChange} />
	// <ErrorMsg shown={passwordNotEntered} text="Need a pass" />
	// <ErrorMsg shown={credentialsInvalid} text="Access denied" />

	render() {
		const { signin } = this.props;

		return (
			<div className="login-content">
				<p className="media">
					<LogoSpinner spinning={signin.get('progress')}/>
					<img className="logo-text" src="https://static.binary.com/images/pages/binary-type-logo.svg" />
				</p>
				<InputGroup type="text" placeholder="Token" onChange={::this.onTokenChange} />
				<ErrorMsg
					shown={signin.get('validatedOnce') && signin.get('tokenNotEntered')}
					text="You need to enter a token" />
				<ErrorMsg
					shown={!!signin.get('credentialsInvalid')}
					text="Access denied" />

		<LanguagePicker onChange={::this.onLanguageChange} />
				<button className="outline-link signin-btn" onClick={::this.trySignin}>Sign in</button>
				<a className="outline-link" href="https://www.binary.com/user/api_token">Get your API token</a>
			</div>
		);
	}
}
