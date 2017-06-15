import React, { PureComponent } from 'react';
import { trackEvent } from 'binary-utils/lib/Analytics';
import { M, Legend } from 'binary-components';
import storage from '../_store/storage';

export default class SettingsUI extends PureComponent {

  props: {
    theme: string,
  };

  onThemeChange = (e: SyntheticEvent) => {
    window.BinaryBoot.theme = e.target.value === 'light' ? 'dark' : 'light';
    storage.setItem('boot', JSON.stringify(window.BinaryBoot));
    trackEvent('Workspace', 'Theme', window.BinaryBoot.theme);
    window.location.reload();
  }

  render() {
    const theme = window.BinaryBoot.theme;

    return (
			<div className="settings-ui">
				<Legend text="User Interface" />
				<label htmlFor="theme">
					<input
						id="theme"
						type="checkbox"
						value={theme}
						checked={theme === 'dark'}
						onChange={this.onThemeChange}
					/>
					<M m="Dark Theme" />&nbsp;
				</label>
			</div>
    );
  }
}
