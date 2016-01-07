import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as LiveData from '../_data/LiveData';
import { ErrorMsg, InputGroup, LanguagePicker, LogoSpinner, M } from '../_common';

export default class SigninCard extends React.Component {

	static propTypes = {
		token: PropTypes.string,
		actions: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
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

	trySignin() {
		const { actions, history, token } = this.props;
		actions.signinFieldUpdate('progress', true);
		actions.signinFieldUpdate('validatedOnce', true);
		LiveData.api.authorize(token).then(
			() => {
				actions.updateAppInfo('authorized', true);
				history.push('/');
			},
			() => actions.signinFieldUpdate('credentialsInvalid', true)
		).then(() => actions.signinFieldUpdate('progress', false));
	}

	render() {
		const { signin } = this.props;

		return (
			<div className="startup-content">
				<form className="mobile-form" onSubmit={e => e.preventDefault()}>
					<p className="media">
						<LogoSpinner spinning={signin.get('progress')}/>
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
						shown={signin.get('validatedOnce') && signin.get('tokenNotEntered')}
						text="You need to enter a token"
					/>
					<ErrorMsg
						shown={signin.get('validatedOnce') && signin.get('credentialsInvalid') && !signin.get('tokenNotEntered')}
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
