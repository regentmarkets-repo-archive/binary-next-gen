import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import Countries from '../common/Countries';
import ErrorMsg from '../common/ErrorMsg';

export default class SignupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progress: false,
		};
	}

	performSignup() {
	}

	openAccount(e) {
		e.preventDefault();
		this.setState({
			progress: true
		});
		this.performSignup();
	}

	render() {

		const { progress } = this.state;

		return (
			<form className='wide-form'>
				<LogoSpinner spinning={progress} />
				<h3>Open Virtual Money Account</h3>
				<input placeholder="Email" />
				<ErrorMsg shown={false} text="You need to enter an email" />
				<Countries />
				<input placeholder="Password" />
				<ErrorMsg shown={false} text="Enter a password" />
				<input placeholder="Confirm Password" />
				<ErrorMsg shown={false} text="Enter your password again" />
				<ErrorMsg shown={false} text="Two passwords do not match" />
				<button>Create Account</button>
			</form>
		);
	}
}
