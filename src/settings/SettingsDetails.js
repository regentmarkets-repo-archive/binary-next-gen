import React, { PropTypes, PureComponent } from 'react';
import { epochToDateString } from 'binary-utils';
import { Legend, LabeledText, Notice } from 'binary-components';

export default class SettingsDetails extends PureComponent {

	static propTypes = {
		email: PropTypes.string,
		salutation: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		date_of_birth: PropTypes.number,
		country: PropTypes.string,
	};

	render() {
		const { email, salutation, first_name, last_name, date_of_birth, country } = this.props;
		const fullName = first_name ? salutation + ' ' + first_name + ' ' + last_name : 'N/A';
		const dob = date_of_birth ? epochToDateString(date_of_birth) : 'N/A';

		return (
			<div className="settings-details">
				<Legend text="Details" />
				<LabeledText
					id="email"
					label="Email"
					value={email}
				/>
				<LabeledText
					id="name"
					label="Name"
					value={fullName}
				/>
				<LabeledText
					id="dob"
					label="Date of birth"
					value={dob}
				/>
				<LabeledText
					id="residence"
					label="Country Of Residence"
					value={country}
				/>
				<Notice text="To change your name, date of birth, country of residence, or email, contact Customer Support." />
			</div>
		);
	}
}
