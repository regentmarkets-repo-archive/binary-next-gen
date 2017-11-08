import React, { PureComponent } from 'react';
import { LogoSpinner, Button, ErrorMsg, ServerErrorMsg, InputGroup, BackButton } from 'binary-components';
import { isValidEmail } from 'binary-utils';
import { api } from '../_data/LiveData';

export default class VerifyEmailCard extends PureComponent {

    static contextTypes = {
        router: () => undefined,
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

    onFormSubmit = (e: SyntheticEvent) => {
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
			<div>
				{window.cordova && device.platform === 'iOS' && <div className="header inverse">
					<BackButton onClick={() => window.history.back()} />
				</div>}
				<div className="startup-content">
					<div className="full-logo">
						<LogoSpinner spinning={progress} />
						<img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
					</div>
					{serverError && <ServerErrorMsg text={serverError} />}
					<form onSubmit={this.onFormSubmit}>
						<InputGroup
							type="email"
							placeholder="Email"
							onChange={this.onEmailChange}
						/>
						{validatedOnce && !this.emailIsValid &&
							<ErrorMsg text="Enter a valid email" />
						}
						<Button disabled={progress} text="Create Free Account" />
					</form>
				</div>
			</div>
		);
	}
}
