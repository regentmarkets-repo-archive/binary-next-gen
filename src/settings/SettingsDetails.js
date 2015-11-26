import React from 'react';
import LabeledTextList from '../_common/LabeledTextList';
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
		const textContents = [nameObj, dobObj, residenceObj, emailObj];

		return (
			<div>
				<legend>Details</legend>

				<LabeledTextList
					id={'personal-details'}
					textContents={textContents} />
			</div>
		);
	}
}
