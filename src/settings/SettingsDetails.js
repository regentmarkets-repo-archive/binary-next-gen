import React, { PropTypes } from 'react';
import M from '../_common/M';
import LabeledText from '../_common/LabeledText';
import { epochToDateString } from '../_utils/DateUtils';

export default class SettingsDetails extends React.Component {

	static propTypes = {
		settings: PropTypes.object.isRequired,
	};

	render() {
		const { settings } = this.props;

		return (
			<div>
				<legend>
					<M m="Details" />
				</legend>
				<div className="name-val-pairs">
					<LabeledText
						id="name"
						label="Name"
						value={settings.name}
					/>
					<LabeledText
						id="dob"
						label="Date of birth"
						value={epochToDateString(settings.date_of_birth)}
					/>
					<LabeledText
						id="residence"
						label="Country of residence"
						value={settings.country}
					/>
					<LabeledText
						id="email"
						label="Email"
						value={settings.email}
					/>
				</div>
			</div>
		);
	}
}
