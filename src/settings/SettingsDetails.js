import React, { PureComponent } from 'react';
import { epochToDateString } from 'binary-utils';
import { Legend, LabeledText, Notice } from 'binary-components';

export default class SettingsDetails extends PureComponent {

	props: {
		settings: any[],
		loginid: string,
	};

	render() {
		const { email, salutation, first_name, last_name, date_of_birth, country } = this.props.settings;
		const { loginid } = this.props;
		const fullName = first_name ? salutation + ' ' + first_name + ' ' + last_name : 'N/A';
		const dob = date_of_birth ? epochToDateString(date_of_birth) : 'N/A';
		const isVirtual = loginid.startsWith('VRTC');

		return (
			<div className="settings-details">
				<Legend text="Details" />
				<LabeledText
					id="email"
					label="Email"
					value={email}
				/>
				{ !isVirtual &&
				<LabeledText
					id="name"
					label="Name"
					value={fullName}
				/>
        }
				{ !isVirtual &&
				<LabeledText
					id="dob"
					label="Date of birth"
					value={dob}
				/>
        }
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
