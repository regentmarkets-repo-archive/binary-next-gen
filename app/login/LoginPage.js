import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import ErrorMsg from '../common/ErrorMsg';
import InputGroup from '../common/InputGroup'

export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			emailNotValid: false,
			passwordNotEntered: false,
			credentialsInvalid: false,
			validatedOnce: false,
			progress: false
		};
	}

	performLogin() {
		this.setState({
			progress: true
		});

		const credentialsInvalid = true;
	}

	validate() {
		const emailNotValid = !/\S+@\S+\.\S+/.test(this.state.email);
		const passwordNotEntered = this.state.password.length == 0;

		this.setState({
			validatedOnce: true,
			emailNotValid,
			passwordNotEntered
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

	render() {

		const { progress, emailNotValid, passwordNotEntered, credentialsInvalid } = this.state;

		return (
			<div className="login-content">
    			<div id="content">
					<p>
						<LogoSpinner spinning={progress}/>
					</p>
					<h3>Sign in to your account</h3>
					<InputGroup type="email" placeholder="Email" onChange={::this.emailChange} />
					<ErrorMsg shown={emailNotValid} text="You need to enter an email" />
					<InputGroup type="password" placeholder="Password" onChange={::this.passwordChange} />
					<ErrorMsg shown={passwordNotEntered} text="Need a pass" />
					<ErrorMsg shown={credentialsInvalid} text="Access denied" />
					<button onClick={::this.tryLogin}>Sign in</button>
				  	<p>
				    	<a href="#">Forgot password?</a>
				  	</p>
				  	<p>
				    	<a href="#">Open an Account</a>
				  	</p>
				</div>
			</div>
		);
	}
}
