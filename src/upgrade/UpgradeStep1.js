import React, { Component, PropTypes } from 'react';
import Label from 'binary-components/lib/Label';
import Button from 'binary-components/lib/Button';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import DateOfBirth from 'binary-components/lib/DateOfBirth';
import { actions } from '../_store';

export default class UpgradeStep1 extends Component {

	static propTypes = {
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.instanceOf(Date).isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			salutation: '',
			firstName: '',
			lastName: '',
		};
	}

	onSalutationChange = e =>
		this.setState({ salutation: e.target.value });

	onFirstNameChange = e =>
		this.setState({ firstName: e.target.value });

	onLastNameChange = e =>
		this.setState({ lastName: e.target.value });

	onFirstNameValid = firstName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(firstName);

	onLastNameValid = lastName =>
		/^[a-zA-Z\s'.-]{2,30}$/.test(lastName);

	onDayChange = e =>
		this.setState({ day: e.target.value });

	onMonthChange = e =>
		this.setState({ month: e.target.value });

	onYearChange = e =>
		this.setState({ year: e.target.value });

	nextStep = e => {
		e.preventDefault();
		this.setState({ showErr: true });
		const { firstName, lastName } = this.props;
		// if (this.fNameValid(firstName) && this.lNameValid(lastName)) {
		// 	actions.upgradeFieldUpdate('activeStep', 1);
		// }
	}

	render() {
		const { firstName, lastName, dateOfBirth } = this.props;
		const fnameValid = true; // this.fNameValid(firstName);
		const lnameValid = true; // this.lNameValid(lastName);

		return (
			<form onSubmit={this.nextStep}>
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
					text="2-30 characters, letters, spaces and - . ' are allowed"
				/>
				<p>
					<Label htmlFor="dobdd" text="Date of birth" />
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
					<Button text="Next" />
				</p>
			</form>
		);
	}
}
