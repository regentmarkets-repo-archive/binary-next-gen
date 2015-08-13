import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import Countries from '../common/Countries';
import ErrorMsg from '../common/ErrorMsg';
import InputGroup from '../common/InputGroup'

export default class SignupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			residence: '',
			password: '',
			confirmPassword: '',
			emailNotValid: false,
			passwordNotEntered: false,
			confirmationNotEntered: false,
			passwordsDontMatch: false,
			validatedOnce: false,
			progress: false
		};
	}

	performSignup() {
		this.setState({
			progress: true
		});
	}

	validate() {
		const { email, password, confirmPassword } = this.state;
		const emailNotValid = !/\S+@\S+\.\S+/.test(email);
		const passwordNotEntered = password.length == 0;
		const confirmationNotEntered = confirmPassword.length == 0;
		const passwordsDontMatch = confirmPassword.length > 0 && password == confirmPassword;

		this.setState({
			validatedOnce: true,
			emailNotValid,
			passwordNotEntered,
			confirmationNotEntered,
			passwordsDontMatch
		});
	}

	trySignup(e) {

		this.validate();

		if (!(this.state.emailNotValid ||
			this.state.passwordNotEntered ||
			this.state.confirmationNotEntered ||
			this.state.passwordsDontMatch)) {
			this.performSignup();
		}
	}

	emailChange(event) {
		if (this.state.validatedOnce) this.validate();
		this.setState({ email: event.target.value });
	}

	residenceChange(event) {
		if (this.state.validatedOnce) this.validate();
		this.setState({ residence: event.target.value });
	}

	confirmPasswordChange(event) {
		if (this.state.validatedOnce) this.validate();
		this.setState({ confirmPassword : event.target.value });
	}

	passwordChange(event) {
		if (this.state.validatedOnce) this.validate();
		this.setState({ password: event.target.value });
	}

	render() {

		const { progress, emailNotValid, passwordNotEntered, confirmationNotEntered, passwordsDontMatch } = this.state;

		return (
			<div className="signup-content">
    			<div id="content">
					<p className="media">
						<LogoSpinner spinning={progress}/>
					</p>
					<h3>Sign up for account</h3>
					<InputGroup type="email" placeholder="Email" onChange={::this.emailChange} />
					<ErrorMsg shown={emailNotValid} text="You need to enter an email" />
					<fieldset>
						<Countries />
					</fieldset>
					<InputGroup type="password" placeholder="Password" onChange={::this.passwordChange} />
					<ErrorMsg shown={passwordNotEntered} text="Enter a password" />
					<InputGroup type="password" placeholder="Confirm Password" onChange={::this.confirmPasswordChange} />
					<ErrorMsg shown={confirmationNotEntered} text="Enter your password again" />
					<ErrorMsg shown={passwordsDontMatch} text="Two passwords do not match" />
					<button onClick={::this.trySignup}>Create Account</button>
				</div>
			</div>
		);
	}
}
