import React from 'react';
import { Countries, ErrorMsg, InputGroup, LogoSpinner, M } from '../_common';

export default class SignupCard extends React.Component {
	static propTypes = {
		signup: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
	};

	emailValid() {
		const { email } = this.props.signup.toJS();

		return /\S+@\S+\.\S+/.test(email);
	}

	passwordValid() {
		const { password } = this.props.signup.toJS();
		return /^[\s.A-Za-z0-9@_:+-\/=]{5,25}$/.test(password);
	}

	confirmationValid() {
		const { password, confirmPassword } = this.props.signup.toJS();
		return password === confirmPassword;
	}

	performSignup() {
		const { email, password, verificationCode, residence } = this.props.signup.toJS();
		this.props.actions.signupStart({
			email: email,
			client_password: password,
			residence: residence,
			verification_code: verificationCode,
		});
	}

	trySignup() {
		this.props.actions.signupFieldUpdate('validatedOnce', true);
		if (this.emailValid() && this.passwordValid() && this.confirmationValid()) {
			/*
			suppose we need to perform verification and then ask user to verify,
			but this sucks in mobile, so deferred and seeks JY opinions
			* */
		}
	}

	emailChange(event) {
		this.props.actions.signupFieldUpdate('email', event.target.value);
	}

	residenceChange(event) {
		this.props.actions.signupFieldUpdate('residence', event.target.value);
	}

	confirmPasswordChange(event) {
		this.props.actions.signupFieldUpdate('confirmPassword', event.target.value);
	}

	passwordChange(event) {
		this.props.actions.signupFieldUpdate('password', event.target.value);
	}

	render() {
		const { residence, validatedOnce, progress } = this.props.signup.toJS();
		const countryNotSelected = !residence;
		const emailNotValid = !this.emailValid();
		const passwordNotValid = !this.passwordValid();
		const passwordsDontMatch = !this.confirmationValid();

		return (
			<div className="signup-content">
				<p className="media">
					<LogoSpinner spinning={progress}/>
				</p>
				<InputGroup
					type="email"
					placeholder="Email"
					onChange={::this.emailChange} />
				<ErrorMsg
					shown={validatedOnce && emailNotValid}
					text="You need to enter an email" />
				<fieldset>
					<Countries onChange={::this.residenceChange}/>
				</fieldset>
				<ErrorMsg
					shown={validatedOnce && countryNotSelected}
					text="Please select a country" />
				<InputGroup
					type="password"
					placeholder="Password"
					onChange={::this.passwordChange} />
				<ErrorMsg
					shown={validatedOnce && passwordNotValid}
					text="Password not valid" />
				<InputGroup
					type="password"
					placeholder="Confirm Password"
					onChange={::this.confirmPasswordChange} />
				<ErrorMsg
					shown={validatedOnce && passwordsDontMatch}
					text="Passwords do not match" />
				<button onClick={::this.trySignup}>
					<M m="Create Account" />
				</button>
			</div>
		);
	}
}
