import React, { PropTypes, Component } from 'react';
import epochToDateString from 'binary-utils/lib/epochToDateString';
import M from 'binary-components/lib/M';
import LabeledText from 'binary-components/lib/LabeledText';

export default class SettingsDetails extends Component {

	static propTypes = {
		email: PropTypes.string.isRequired,
		name: PropTypes.string,
		date_of_birth: PropTypes.string,
		country: PropTypes.string.isRequired,
	};

	render() {
		const { email, name, date_of_birth, country } = this.props;

		return (
			<div className="settings-container">
				<legend>
					<M m="Details" />
				</legend>
				<LabeledText
					id="email"
					label="Email"
					value={email}
				/>
				<LabeledText
					id="name"
					label="Name"
					value={name}
				/>
				<LabeledText
					id="dob"
					label="Date of birth"
					value={epochToDateString(date_of_birth)}
				/>
				<LabeledText
					id="residence"
					label="Country of residence"
					value={country}
				/>
				<p className="notice-msg">
					<M m="To change your name, date of birth, country of residence, or email, contact Customer Support." />
				</p>
			</div>
		);
	}
}
