import React, { PureComponent, PropTypes } from 'react';
import { LogoSpinner, Button, Error, InputGroup } from 'binary-components';
import { isValidEmail } from 'binary-utils';
import { api } from '../_data/LiveData';

export default class VerifyEmailCard extends PureComponent {

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
                <div className="full-logo">
                    <LogoSpinner spinning={progress} />
                    <img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
                </div>
				{serverError &&
					<Error text={serverError} />
				}
				<form onSubmit={this.onFormSubmit}>
					<InputGroup
						type="email"
						placeholder="Email"
						onChange={this.onEmailChange}
					/>
					{validatedOnce && !this.emailIsValid &&
						<Error text="Enter a valid email" />
					}
					<Button disabled={progress} text="Create Free Account" />
				</form>
			</div>
		);
	}
}
