import React from 'react';
import LabeledText from '../_common/LabeledText';
import {epochToDateString} from '../_utils/DateUtils';

export default class SettingsDetails extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const {settings} = this.props;
		const nameObj = {
			id: 'name',
			label: 'Name',
			value: settings.name,
		};
		const dobObj = {
			id: 'dob',
			label: 'Date of birth',
			value: epochToDateString(settings.date_of_birth),
		};
		const residenceObj = {
			id: 'residence',
			label: 'Country of residence',
			value: settings.country,
		};
		const emailObj = {
			id: 'email',
			label: 'Email',
			value: settings.email,
		};
		return (
			<div>
				<legend>Details</legend>
				<div className="name-val-pairs">
					<LabeledText
						{...nameObj}
						/>
					<LabeledText
						{...dobObj}
						/>
					<LabeledText
						{...residenceObj}
						/>
					<LabeledText
						{...emailObj}
						/>
				</div>
			</div>
		);
	}
}
