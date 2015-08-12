import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import Countries from '../common/Countries';

export default class SignupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progress: false,
			currentPage: 0
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
		return (
			<form className='wide-form' >
				<LogoSpinner spinning={this.state.progress}/>
				<h3>Open Virtual Money Account</h3>
				<input />
				<Countries/>
				<input />
				<input />
				<button>Create Account</button>
			</form>
		);
	}
}
