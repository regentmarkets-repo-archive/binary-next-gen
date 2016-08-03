import React, { PropTypes, PureComponent } from 'react';
import { epochToDateString } from 'binary-utils';
import { Legend, LabeledText, Notice } from 'binary-components';

export default class SettingsDetails extends PureComponent {

	static propTypes = {
		email: PropTypes.string.isRequired,
		salutation: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		date_of_birth: PropTypes.number,
		country: PropTypes.string.isRequired,
	};

	render() {
		const { email, salutation, first_name, last_name, date_of_birth, country } = this.props;

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
					value={salutation + ' ' + first_name + ' ' + last_name}
				/>
				<LabeledText
					id="dob"
					label="Date of birth"
					value={epochToDateString(date_of_birth)}
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
