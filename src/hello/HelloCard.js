import React, { PureComponent } from 'react';
import { M, LogoSpinner } from 'binary-components';
import { Link } from 'react-router';
import { signIn } from '../_data/Auth';
import LanguagePicker from '../web/LanguagePicker';

export default class HelloCard extends PureComponent {
	render() {
		return (
			<div className="startup-content">
				<div className="full-logo">
					<LogoSpinner />
					<img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
				</div>
				<LanguagePicker />
				<Link to="/signup" className="create-account-button btn-secondary">
					<M m="Create Account" />
				</Link>
				<M className="have-account" m="Already have an account?" />
				<Link to="/" className="signin-button btn-primary" onClick={signIn}>
					<M m="Sign In" />
				</Link>
			</div>
		);
	}
}
