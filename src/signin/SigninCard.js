import React from 'react';
import { Link } from 'react-router';
import LogoSpinner from '../_common/LogoSpinner';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import LanguagePicker from '../_common/LanguagePicker';
import * as LiveData from '../_data/LiveData';
import StateStorage from '../_store/StateStorage';

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
		const {actions, history} = this.props;
		actions.signinFieldUpdate('progress', true);
		const token = this.props.signin.get('token');
		LiveData.api.authorize(token).then(
			() => {
				StateStorage.set('token', token);
				history.pushState({}, '/');
			},
			() => {	this.props.actions.signinFailed(); }
		);
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
				<button className="outline-link signin-btn" onClick={::this.trySignin}>Sign In</button>
				<Link to="/signup" className="outline-link">Create Account</Link>
				<br />
				<a className="outline-link" href="https://www.binary.com/user/api_token">Get your API token</a>
			</div>
		);
	}
}
