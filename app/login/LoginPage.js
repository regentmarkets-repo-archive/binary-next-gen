import React from 'react';
import LogoSpinner from '../common/LogoSpinner';
import ErrorMsg from '../common/ErrorMsg';

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
					<p>
						<input name="email" placeholder="Email" type="email"></input>
					</p>
					<ErrorMsg shown={false} text="You need to enter an email" />
				  	<p>
				    	<input name="password" placeholder="Password" type="password"></input>
				  	</p>
					<ErrorMsg shown={false} text="Need a pass" />
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
