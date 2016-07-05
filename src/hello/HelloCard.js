import React, { Component } from 'react';
import { Link } from 'react-router';
import M from 'binary-components/lib/M';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import LanguagePicker from '../web/LanguagePicker';

export default class HelloCard extends Component {

	render() {
		return (
			<div className="startup-content">
				<p className="media">
					<LogoSpinner />
					<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				</p>
				<LanguagePicker />
				<fieldset>
					<Link to="/" className="btn-secondary">
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
