import React, { Component } from 'react';
import { Link } from 'react-router';
import M from 'binary-components/lib/M';
import { signIn } from '../_data/Auth';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import LanguagePicker from '../web/LanguagePicker';

export default class HelloCard extends Component {
	render() {
		return (
			<div className="startup-content">
				<div className="full-logo">
					<LogoSpinner />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</div>
				<LanguagePicker />
				<Link to="/signup" className="create-account-button btn-secondary">
					<M m="Create Account" />
				</Link>
				<M className="have-account" m="Already have an account?" />
				<Link to="/" className="signin-button btn-primary" onClick={signIn}>
					<M m="Sign in" />
				</Link>
			</div>
		);
	}
}
