import React from 'react';
import LogoSpinner from '../common/LogoSpinner';

export default class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			progress: false
		};
	}

	submitLogin() {
		this.setState({
			progress: true
		});
	}

	render() {
		return (
			<div className="login-content">
    			<div id="content">
					<p>
						<LogoSpinner spinning={this.state.progress}/>
					</p>
					<h3>Sign in to your account</h3>
					<p className="errorfield bigerror" style={{display: 'none' }}>
		                Binary.com now requires your email and password to log in. If you have both a real-money and a virtual-money account, please use the password from your real-money account.
					</p>
					<p>
						<a href="#">Login Trouble!</a>
					</p>
					<p>
						<input name="email" placeholder="Email" type="email"></input>
					</p>
				  	<p>
				    	<input name="password" placeholder="Password" type="password"></input>
				  	</p>
				  	<p>
						<button onClick={::this.submitLogin}>Sign in</button>
				  	</p>
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
