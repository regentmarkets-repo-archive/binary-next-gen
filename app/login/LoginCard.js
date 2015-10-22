import React from 'react';
import LogoSpinner from '../_common/LogoSpinner';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import LanguagePicker from '../_common/LanguagePicker';

export default class LoginCard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			language: 'EN',
			emailNotValid: false,
			passwordNotEntered: false,
			credentialsInvalid: false,
			validatedOnce: false,
			progress: false,
		};
	}

	performLogin() {
		this.setState({
			progress: true,
		});
	}

	validate() {
		const emailNotValid = !/\S+@\S+\.\S+/.test(this.state.email);
		const passwordNotEntered = this.state.password.length === 0;

		this.setState({
			validatedOnce: true,
			emailNotValid,
			passwordNotEntered,
		});
	}

	tryLogin() {
		this.validate();

		if (!(this.state.emailNotValid || this.state.passwordNotEntered)) {
			this.performLogin();
		}
	}

	emailChange(event) {
		if (this.state.validatedOnce) this.validate();
        this.setState({ email: event.target.value });
    }

	passwordChange(event) {
		if (this.state.validatedOnce) this.validate();
        this.setState({ password: event.target.value });
    }

	languageChange(event) {
		this.setState({ language: event.target.value });
	}

	render() {
		const { validatedOnce, progress, emailNotValid, passwordNotEntered, credentialsInvalid } = this.state;

		return (
			<div className="login-content">
				<p className="media">
					<LogoSpinner spinning={progress}/>
					<img className="logo-text" src="https://static.binary.com/images/pages/binary-type-logo.svg" />
				</p>
				<InputGroup type="email" placeholder="Email" onChange={::this.emailChange} />
				<ErrorMsg shown={validatedOnce && emailNotValid} text="You need to enter an email" />
				<InputGroup type="password" placeholder="Password" onChange={::this.passwordChange} />
				<ErrorMsg shown={passwordNotEntered} text="Need a pass" />
				<ErrorMsg shown={credentialsInvalid} text="Access denied" />
				<LanguagePicker onChange={::this.languageChange}/>
				<button onClick={::this.tryLogin}>Sign in</button>
				<p className="row">
			    	<a href="#">Forgot password?</a>
			    	<a href="#">Sign Up</a>
			  	</p>
			</div>
		);
	}
}
