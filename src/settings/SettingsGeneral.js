import React, { PropTypes } from 'react';
import { LanguagePicker, M } from '../_common';

export default class SettingsGeneral extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
		appConfig: PropTypes.object.isRequired,
	};

	onThemeChange(e) {
		this.props.actions.updateAppConfig('theme', e.target.value);
	}

	render() {
		const { theme } = this.props.appConfig;
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
