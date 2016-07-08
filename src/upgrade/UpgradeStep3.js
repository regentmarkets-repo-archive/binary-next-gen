import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import Legend from 'binary-components/lib/Legend';
import Button from 'binary-components/lib/Button';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import SecretQuestion from './SecretQuestion';

export default class UpgradeStep3 extends Component {

	static propTypes = {
		secretQuestion: PropTypes.string.isRequired,
		secretAnswer: PropTypes.string.isRequired,
		error: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = { validatedOnce: false };
	}

	onSecretQuestionChange = e =>
		this.setState({ secretQuestion: e.target.value });

	onSecretAnswerChange = e =>
		this.setState({ secretAnswer: e.target.value });

	onTermsAndConditionsChanged = e =>
		this.setState({ termsAndConditions: e.target.value });

	previousStep = e => {
		e.preventDefault();
		// actions.upgradeFieldUpdate('activeStep', 1);
	}

	openAccount = e => {
		e.preventDefault();
		this.setState({ showErr: true });
		const { secretAnswer } = this.props;
		const { checked } = this.state;
		if (this.secretAnsValid(secretAnswer) && checked) {
			// actions.upgradeFieldUpdate('progress', true);
			// actions.upgradeConfirm();
		}
	}

	secretAnswerValid = answer =>
		answer.length >= 4;

	render() {
		const { secretAnswer, secretQuestion } = this.props;
		const { showErr, checked } = this.state;

		return (
			<form onSubmit={this.openAccount}>
				<Legend text="Security" />
				<input name="chooseapassword" placeholder="Password" type="password" />
				<p>
					<SecretQuestion />
					<input
						name="secretanswer"
						placeholder="Answer to secret question"
						type="text"
						maxLength="50"
						onChange={this.onSecretAnswerChange}
					/>
					{false &&
						<ErrorMsg text="Please select a secret question" />
					}
					{false &&
						<ErrorMsg text="Secret answer must be at least 4 characters" />
					}
				</p>
				<p>
					<label>
						<input
							name="tnc"
							type="checkbox"
							onClick={this.onTermsAndConditionsChanged}
						/>
						<M m="I have read and agree to the" />&nbsp;
						<a href="https://binary.com/terms-and-conditions" target="_blank">
							<M m="terms and conditions" />
						</a>
					</label>
					{false &&
						<ErrorMsg text="You need to agree to our Terms and Conditions" />
					}
				</p>
				<p>
					<Button className="btn-secondary" text="Back" onClick={this.previousStep} />
					<Button text="Open Account" />
				</p>
			</form>
		);
	}
}
