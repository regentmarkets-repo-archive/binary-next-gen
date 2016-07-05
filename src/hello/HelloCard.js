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
				<fieldset>
					<Link to="/" className="btn-secondary" onClick={signIn} >
						<M m="Signin" />
					</Link>
				</fieldset>
				<fieldset>
					<Link to="/create-account" className="btn-secondary">
						<M m="Create Account" />
					</Link>
				</fieldset>
			</div>
		);
	}
}
