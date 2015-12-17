import React, { PropTypes } from 'react';
import { ErrorMsg, InputGroup, LanguagePicker, LogoSpinner, M } from '../_common';

export default class SigninCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
	};

	onTokenChange(event) {
		this.props.actions.updateToken(event.target.value);
	}

	trySignin() {
		const { actions, history } = this.props;
		actions.signinFieldUpdate('progress', true);
		history.push('/'); // no need to authorize here onEnter hook will authorize
	}

	render() {
		const { signin } = this.props;

		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
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
						shown={!!signin.get('credentialsInvalid')}
						text="Access denied"
					/>
					<LanguagePicker />
					<button className="btn-primary" onClick={::this.trySignin}>
						<M m="Sign In" />
					</button>
				</form>

				<p style={{ alignSelf: 'bottom' }}>
					<a className="btn-secondary" target="new" href="https://www.binary.com/user/api_token">
						<M m="Get your API token" />
					</a>
				</p>
				<p>
					<a className="btn-secondary" target="new" href="https://www.binary.com">
						<M m="Create Account" />
					</a>
				</p>
			</div>
		);
	}
}
