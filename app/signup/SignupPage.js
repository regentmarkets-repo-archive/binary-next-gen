import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import Countries from '../common/Countries';
import ErrorMsg from '../common/ErrorMsg';
import InputGroup from '../common/InputGroup'

export default class SignupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progress: false,
		};
	}

	performSignup() {
	}

	trySignup(e) {
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
				<InputGroup type="email" placeholder="Email" />
				<ErrorMsg shown={false} text="You need to enter an email" />
				<fieldset>
					<Countries />
				</fieldset>
				<InputGroup type="password" placeholder="Password" />
				<ErrorMsg shown={false} text="Enter a password" />
				<InputGroup type="password" placeholder="Confirm Password" />
				<ErrorMsg shown={false} text="Enter your password again" />
				<ErrorMsg shown={false} text="Two passwords do not match" />
				<button onClick={this.trySignup}>Create Account</button>
			</form>
		);
	}
}
