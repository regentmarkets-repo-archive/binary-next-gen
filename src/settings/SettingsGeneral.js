import React, { PropTypes } from 'react';
import { LanguagePicker, M } from '../_common';

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
				<label htmlFor="language-picker"><M m="Language" /></label>
				<LanguagePicker id="language-picker" />
				<label htmlFor="theme-picker"><M m="Color Theme" /></label>
				<select onChange={::this.onThemeChange} value={theme} id="theme-picker">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>
		);
	}
}
