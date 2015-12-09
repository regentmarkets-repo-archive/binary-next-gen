import React, { PropTypes } from 'react';
import { ErrorMsg, InputGroup, LanguagePicker, LogoSpinner, M } from '../_common';

export default class SigninCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
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

	// onLanguageChange(event) {
	// 	this.props.actions.signinFieldUpdate('language', event.target.value);
	// 	LiveData.api.changeLanguage(event.target.value);
	// }

	trySignin() {
		const { actions, history } = this.props;
		actions.signinFieldUpdate('progress', true);
		history.push('/'); // no need to authorize here onEnter hook will authorize
	}

	// <InputGroup type="email" placeholder="Email" onChange={::this.emailChange} />
	// <ErrorMsg shown={validatedOnce && emailNotValid} text="You need to enter an email" />
	// <InputGroup type="password" placeholder="Password" onChange={::this.passwordChange} />
	// <ErrorMsg shown={passwordNotEntered} text="Need a pass" />
	// <ErrorMsg shown={credentialsInvalid} text="Access denied" />

	render() {
		const { signin } = this.props;

		return (
			<form className="login-content" onSubmit={e => e.preventDefault()}>
				<p className="media">
					<LogoSpinner spinning={signin.get('progress')}/>
					<img className="logo-text" src="img/binary-type-logo.svg" />
				</p>
				<InputGroup
					id="token-input"
					type="text"
					placeholder="Token"
					onChange={::this.onTokenChange}
					autoFocus
					min={15}
				/>
				<ErrorMsg
					shown={signin.get('validatedOnce') && signin.get('tokenNotEntered')}
					text="You need to enter a token" />
				<ErrorMsg
					shown={!!signin.get('credentialsInvalid')}
					text="Access denied" />

				<LanguagePicker />
				<button className="outline-link signin-btn" onClick={::this.trySignin}>
					<M m="Sign In" />
				</button>
				<a className="outline-link" target="new" href="https://www.binary.com/user/api_token">
					<M m="Get your API token" />
				</a>
				<br />
				<a className="outline-link" target="new" href="https://www.binary.com">
					<M m="Create Account" />
				</a>
			</form>
		);
	}
}
