import React from 'react';
import InputGroup from '../_common/InputGroup';

export default class SettingsDetails extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const {settings} = this.props;

		return (
			<div>
				<legend>Details</legend>

				<InputGroup
					id="name"
					label="Name"
					type="text"
					value={settings.name}
					readOnly />
				<InputGroup
					id="dob"
					label="Date of birth"
					type="date"
					value="1981-12-12"
					readOnly />
				<InputGroup
					id="residence"
					label="Country of Residence"
					type="text"
					value={settings.country}
					readOnly />
				<InputGroup
					id="email"
					label="Email"
					type="email"
					value={settings.email}
					readOnly />

			</div>
		);
	}
}
