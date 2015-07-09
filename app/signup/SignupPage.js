import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';

export default class SignupPage extends React.Component {

	static getProps() {
		return {};
	}

	constructor(props) {
		super(props);

		this.state = {
			progress: false,
			currentPage: 1
		};
	}

	performSignup() {
		console.log('Hello!');
	}

	nextStep(e) {
		e.preventDefault();
		this.setState({
			currentPage: this.state.currentPage + 1
		});
	}

	openAccount(e) {
		e.preventDefault();
		this.setState({
			progress: true
		});
		this.performSignup();
	}

	previousStep(e) {
		e.preventDefault();
		this.setState({
			currentPage: this.state.currentPage - 1
		});
	}

	render() {

		const steps = [(
			<div>
				<SignupStep1 />
				<p>
					<button onClick={::this.nextStep}>Next</button>
				</p>
			</div>
		), (
			<div>
				<SignupStep2 />
				<p>
					<button onClick={::this.previousStep}>Back</button>
					<button onClick={::this.nextStep}>Next</button>
				</p>
			</div>
		), (
			<div>
				<SignupStep3 />
				<p>
					<button onClick={::this.previousStep}>Back</button>
					<button onClick={::this.openAccount}>Open Account</button>
				</p>
			</div>
		)];

		return (
			<form className='wide-form' >
				<p>
					<LogoSpinner spinning={this.state.progress}/>
				</p>
				<h3>Open Real Money Account</h3>
				{ steps[this.state.currentPage] }
			</form>
		);
	}
}
