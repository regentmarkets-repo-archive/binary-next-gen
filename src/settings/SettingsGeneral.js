import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import LanguagePicker from '../_common/LanguagePicker';

export default class SettingsGeneral extends Component {

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
