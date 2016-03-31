import React, { Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import ErrorMsg from '../_common/ErrorMsg';
import DateOfBirth from '../_common/DateOfBirth';

export default class UpgradeStep1 extends Component {
	constructor(props) {
		super(props);
		this.state = { showErr: false };
	}

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		firstName: React.PropTypes.string.isRequired,
		lastName: React.PropTypes.string.isRequired,
		dateOfBirth: React.PropTypes.instanceOf(Date).isRequired,
	};

	salutationChange(e) {
		this.props.actions.upgradeFieldUpdate('salutation', e.target.value);
	}

	fnameChange(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('firstName', e.target.value);
	}

	lnameChange(e) {
		this.setState({ showErr: true });
		this.props.actions.upgradeFieldUpdate('lastName', e.target.value);
	}

	fNameValid(fname) {
		return /^[a-zA-Z\s'.-]{2,30}$/.test(fname);
	}

	lNameValid(lname) {
		return /^[a-zA-Z\s'.-]{2,30}$/.test(lname);
	}

	onDayChange(e) {
		this.props.actions.upgradeDOBUpdate('day', e.target.value);
	}

	onMonthChange(e) {
		this.props.actions.upgradeDOBUpdate('month', e.target.value);
	}

	onYearChange(e) {
		this.props.actions.upgradeDOBUpdate('year', e.target.value);
	}

	nextStep(e) {
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
					<select id="mrms" name="mrms" onChange={::this.salutationChange}>
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
						onChange={::this.fnameChange}
						maxLength="30"
					/>
					<input
						name="lname"
						placeholder="Family name"
						type="text"
						value={lastName}
						onChange={::this.lnameChange}
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
						onDayChange={::this.onDayChange}
						onMonthChange={::this.onMonthChange}
						onYearChange={::this.onYearChange}
					/>
				</p>
				<p>
					<Button
						text="Next"
						onClick={::this.nextStep}
					/>
				</p>
			</div>
		);
	}
}
