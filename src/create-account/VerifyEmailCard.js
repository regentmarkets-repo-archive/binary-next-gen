import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import InputGroup from 'binary-components/lib/InputGroup';
import Button from 'binary-components/lib/Button';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import isValidEmail from 'binary-utils/lib/isValidEmail';
import { api } from '../_data/LiveData';

export default class VerifyEmailCard extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = {
			progress: false,
			email: '',
		};
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.emailInput).focus();
	}

	onEmailChange = event =>
        this.setState({ email: event.target.value });

    onFormSubmit = e => {
		e.preventDefault();
        this.setState({
            validatedOnce: true,
        });
        if (this.emailIsValid) {
            this.verifyEmail();
        }
    }

    verifyEmail = async () => {
        const { email } = this.state;

        try {
            this.setState({
                progress: true,
                error: false,
            });
            await api.verifyEmail(email, 'account_opening');
			this.context.router.push('/signup2');
        } catch (serverError) {
            this.setState({
				serverError,
				progress: false,
			});
        }
    }

	render() {
		const { email, serverError, progress, validatedOnce } = this.state;
		this.emailIsValid = isValidEmail(email);

		return (
			<div className="startup-content">
				<LogoSpinner spinning={progress} />
				<img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
				{serverError &&
					<ErrorMsg text={serverError} />
				}
				<form onSubmit={this.onFormSubmit}>
					<fieldset>
						<input
							type="email"
							placeholder="Email"
							ref="emailInput"
							onChange={this.onEmailChange}
						/>
					</fieldset>
					{validatedOnce && !this.emailIsValid &&
						<ErrorMsg text="Please enter a valid email" />
					}
					<Button disabled={progress} text="Create Free Account" />
				</form>
			</div>
		);
	}
}
