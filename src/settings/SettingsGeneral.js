import React, { PropTypes } from 'react';
import LanguagePicker from '../_common/LanguagePicker';

export default class SettingsGeneral extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
	};

	onThemeChange(e) {
		this.props.actions.updateSettingFields({ theme: e.target.value });
	}

	render() {
		const { theme } = this.props.settings;
		return (
			<div>
				<LanguagePicker />
				<select onChange={::this.onThemeChange} value={theme}>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>
		);
	}
}
