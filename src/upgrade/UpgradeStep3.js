import React, { Component } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import Modal from '../containers/Modal';

export default class UpgradeStep3 extends Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		secretQuestion: React.PropTypes.string.isRequired,
		secretAnswer: React.PropTypes.string.isRequired,
		error: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = { showErr: false, checked: false };
	}

	onSecretQuestionChange = e => {
		this.props.actions.upgradeFieldUpdate('secretQuestion', e.target.value);
	}

	onSecretAnswerChange = e => {
		this.props.actions.upgradeFieldUpdate('secretAnswer', e.target.value);
	}

	previousStep = e => {
		e.preventDefault();
		this.props.actions.upgradeFieldUpdate('activeStep', 1);
	}

	openAccount = e => {
		e.preventDefault();
		this.setState({ showErr: true });
		const { secretAnswer } = this.props;
		const { checked } = this.state;
		if (this.secretAnsValid(secretAnswer) && checked) {
			this.props.actions.upgradeFieldUpdate('progress', true);
			this.props.actions.upgradeConfirm();
		}
	}

	secretAnswerValid = answer =>
		answer.length >= 4;

	checkBoxClicked = () => {
		const isChecked = this.state.checked;
		this.setState({ checked: !isChecked });
	}

	closeErrorModal = () => this.props.actions.upgradeFieldUpdate('error', null);

	render() {
		const { secretAnswer, secretQuestion, error } = this.props;
		const { showErr, checked } = this.state;

		return (
			<div>
				<p>
					<label>
						<M m="Security" />
					</label>
				</p>
				<p>
					<input name="chooseapassword" placeholder="Password" type="password" />
				</p>
				<Modal
					shown={!!error}
					onClose={this.closeErrorModal}
					children={
						<div>
							<h3>Upgrade Failed</h3>
							<p>{error}</p>
						</div>
					}
				/>
				<p>
					<select name="secretquestion" onChange={this.onSecretQuestionChange} value={secretQuestion}>
						<option value="">Secret question</option>
						<option value="Mother's maiden name">Mother's maiden name</option>
						<option value="Name of your pet">Name of your pet</option>
						<option value="Name of first love">Name of first love</option>
						<option value="Memorable town/city">Memorable town/city</option>
						<option value="Memorable date">Memorable date</option>
						<option value="Favourite dish">Favourite dish</option>
						<option value="Brand of first car">Brand of first car</option>
						<option value="Favourite artist">Favourite artist</option>
					</select>
					<input
						name="secretanswer"
						value={secretAnswer}
						placeholder="Answer to secret question"
						type="text"
						maxLength="50"
						onChange={this.onSecretAnswerChange}
					/>
				</p>
				<ErrorMsg
					shown={showErr && !secretQuestion}
					text="Please select a secret question"
				/>
				<ErrorMsg
					shown={showErr && !this.secretAnswerValid(secretAnswer)}
					text="Secret answer must be at least 4 characters"
				/>
				<p>
					<label>
						<input
							name="tnc"
							type="checkbox"
							checked={this.state.checked}
							onClick={this.checkBoxClicked}
						/>
						<span>I have read and agree to the </span>
						<a href="https://binary.com/terms-and-conditions" target="_blank">terms and conditions</a>
						<span> of the site.</span>
					</label>
				</p>
				<ErrorMsg
					shown={showErr && !checked}
					text="Please make sure you agree on our Terms and Condition"
				/>
				<p>
					<Button
						text="Back"
						onClick={this.previousStep}
					/>
					<Button
						text="Open Account"
						onClick={this.openAccount}
					/>
				</p>
			</div>
		);
	}
}
