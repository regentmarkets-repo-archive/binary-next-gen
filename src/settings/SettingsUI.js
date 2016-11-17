import React, { PureComponent } from 'react';
import { M, Legend } from 'binary-components';
import { actions } from '../_store';

export default class SettingsUI extends PureComponent {

	props: {
		theme: boolean,
		highContrast: boolean,
	};

	onThemeChange = (e: SyntheticEvent) =>
		actions.updateBoot('theme', e.target.value);

	render() {
		const { theme, highContrast } = this.props;

		return (
			<div className="settings-ui">
			<Legend text="User Interface" />
				<label htmlFor="theme">
					<input
						id="theme"
						type="checkbox"
						value={theme}
						onChange={this.onPassword1Change}
					/>
					<M m="Theme" />&nbsp;
				</label>
				<label htmlFor="contract">
					<input
						id="contrast"
						type="checkbox"
						value={theme}
						onChange={this.onPassword1Change}
					/>
					<M m="High Contrast" />&nbsp;
				</label>
			</div>
		);
	}
}
