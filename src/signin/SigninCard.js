import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import * as LiveData from '../_data/LiveData';
import M from '../_common/M';
import ErrorMsg from '../_common/ErrorMsg';
import LogoSpinner from '../_common/LogoSpinner';
import InputGroup from '../_common/InputGroup';
import LanguagePicker from '../_common/LanguagePicker';

export default class SigninCard extends Component {

	static propTypes = {
		token: PropTypes.string,
		actions: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

	onTokenChange(event) {
		this.props.actions.updateToken(event.target.value);
		this.props.actions.signinFieldUpdate('validatedOnce', false);
		this.props.actions.signinFieldUpdate('credentialsInvalid', false);
		this.validateToken(event.target.value);
	}

	validateToken(token) {
		if (token === '') {
			this.props.actions.signinFieldUpdate('tokenNotEntered', true);
		}
	}

	async trySignin() {
		const { actions, token } = this.props;
		const { router } = this.context;

		actions.signinFieldUpdate('progress', true);
		actions.signinFieldUpdate('validatedOnce', true);

		try {
			await LiveData.api.authorize(token);
			actions.updateAppState('authorized', true);
			router.push('/');
		} catch (e) {
			actions.signinFieldUpdate('credentialsInvalid', true);
		} finally {
			actions.signinFieldUpdate('progress', false);
		}
	}

	render() {
		const { progress, validatedOnce, credentialsInvalid, tokenNotEntered } = this.props.signin;

		return (
			<div className="startup-content">
				<form className="mobile-form" onSubmit={e => e.preventDefault()}>
					<p className="media">
						<LogoSpinner spinning={progress} />
						<img className="logo-text" src="img/binary-type-logo.svg" />
					</p>
					<InputGroup
						id="token-input"
						type="text"
						placeholder="Token"
						onChange={::this.onTokenChange}
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
					<LanguagePicker />
					<button className="btn-primary" onClick={::this.trySignin}>
						<M m="Sign In" />
					</button>
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
