import React, { PropTypes } from 'react';
import LanguagePicker from '../_common/LanguagePicker';

export default class SettingsGeneral extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
	};

	render() {
		return (
			<div>
				<LanguagePicker />
				THEME PICKER
			</div>
		);
	}
}
