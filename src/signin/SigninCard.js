import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { tryAuth } from '../_data/Auth';
import M from 'binary-components/lib/M';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import InputGroup from 'binary-components/lib/InputGroup';

export default class SigninCard extends Component {

	static propTypes = {
		token: PropTypes.string,
		actions: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	onTokenChange = event => {
		this.props.actions.updateToken(event.target.value);
		this.props.actions.signinFieldUpdate('validatedOnce', false);
		this.props.actions.signinFieldUpdate('credentialsInvalid', false);
		this.validateToken(event.target.value);
	}

	onFormSubmit = e => e.preventDefault();

	validateToken = token => {
		if (token === '') {
			this.props.actions.signinFieldUpdate('tokenNotEntered', true);
		}
	}

	async trySignin() {
		const { actions, token } = this.props;
		const { router } = this.context;
		try {
			actions.signinFieldUpdate('progress', false);
            this.props.actions.signinFieldUpdate('validatedOnce', true);
			await tryAuth(actions, token);
		} catch (e) {
			actions.updateAppState('authorized', false);
		} finally {
			actions.updateAppState('connected', true);
			router.push('/');
		}
	}

	render() {
		const { progress, validatedOnce, credentialsInvalid, tokenNotEntered } = this.props.signin;
		return (
			<div className="startup-content">
				<form className="mobile-form" onSubmit={this.onFormSubmit}>
					<p className="media">
						<LogoSpinner spinning={progress} />
						<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
					</p>
					<InputGroup
						id="token-input"
						type="text"
						placeholder="Token"
						onChange={this.onTokenChange}
						autoFocus
						min={15}
						autoComplete="off"
					/>
					<ErrorMsg
						shown={validatedOnce && tokenNotEntered}
						text="You need to enter a token"
					/>
					<ErrorMsg
						shown={validatedOnce && credentialsInvalid && !tokenNotEntered}
						text="Access denied"
					/>
				</form>
				<fieldset>
					<Link to="/create-account" className="btn-secondary">
						<M m="Create Account" />
					</Link>
				</fieldset>
			</div>
		);
	}
}
