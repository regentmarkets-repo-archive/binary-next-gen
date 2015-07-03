import React from 'react';
import { Link } from 'react-router';
import DateOfBirth from './DateOfBirth';
import Countries from './Countries';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep3';
import SignupStep3 from './SignupStep3';

export default class SignupPage extends React.Component {

	static getProps() {
		return {};
	}

	constructor(props) {
		super(props);

		this.state = {
			currentPage: 1
		}
	}

	render() {
		return (
			<form className='wide-form' >
				<p>
					<img className='form-logo'/>
				</p>
				<h3>Open Real Money Account</h3>
				<SignupStep1 />
				<SignupStep2 />
				<SignupStep3 />
			    <p>
			      	<button className='important' id='open-real-acount' value='Open Account'>Open Account</button>
			    </p>
		    </form>
		)
	}
}
