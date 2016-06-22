import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import DateOfBirth from 'binary-components/lib/DateOfBirth';

export default class UpgradeStep1 extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.instanceOf(Date).isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { showErr: false };
	}

	onSalutationChange = e => {
		this.props.actions.upgradeFieldUpdate('salutation', e.target.value);
	}

	onFirstNameChange = e => {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('firstName', e.target.value);
	}

	onLastNameChange = e => {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('lastName', e.target.value);
	}

	onFirstNameValid = firstName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(firstName);

	onLastNameValid = lastName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(lastName);

	onDayChange = e => {
		this.props.actions.upgradeDOBUpdate('day', e.target.value);
	}

	onMonthChange = e => {
		this.props.actions.upgradeDOBUpdate('month', e.target.value);
	}

	onYearChange = e => {
		this.props.actions.upgradeDOBUpdate('year', e.target.value);
	}

	nextStep = e => {
		e.preventDefault();
		this.setState({ showErr: true });
		const { firstName, lastName } = this.props;
		if (this.fNameValid(firstName) && this.lNameValid(lastName)) {
			this.props.actions.upgradeFieldUpdate('activeStep', 1);
		}
	}

	render() {
		const { firstName, lastName, dateOfBirth } = this.props;
		const fnameValid = this.fNameValid(firstName);
		const lnameValid = this.lNameValid(lastName);
		return (
			<div>
				<p>
					<select id="mrms" name="mrms" onChange={this.onSalutationChange}>
						<option value="Mr">Mr</option>
						<option value="Mrs">Mrs</option>
						<option value="Ms">Ms</option>
						<option value="Miss">Miss</option>
						<option value="Dr">Dr</option>
						<option value="Prof">Prof</option>
					</select>
					<input
						name="fname"
						placeholder="First name"
						type="text"
						value={firstName}
						onChange={this.onFirstNameChange}
						maxLength="30"
					/>
					<input
						name="lname"
						placeholder="Family name"
						type="text"
						value={lastName}
						onChange={this.onLastNameChange}
						maxLength="30"
					/>
				</p>
				<ErrorMsg
					shown={!(fnameValid && lnameValid) && this.state.showErr}
					text="2-30 characters, letters, spaces and  - . ' are allowed"
				/>
				<p>
					<label htmlFor="dobdd"><M m="Date of birth" /></label>
				</p>
				<p>
					<DateOfBirth
						date={dateOfBirth}
						onDayChange={this.onDayChange}
						onMonthChange={this.onMonthChange}
						onYearChange={this.onYearChange}
					/>
				</p>
				<p>
					<Button
						text="Next"
						onClick={this.nextStep}
					/>
				</p>
			</div>
		);
	}
}
