import React, { PureComponent } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends PureComponent {

	props: {
		loginid: string,
    settings: object,
	};

	render() {
		const { loginid, settings } = this.props;
		const isVirtual = loginid.startsWith('VRTC');

		return (
			<div className="settings-personal-page">
				<SettingsDetails {...this.props} {...settings} />
				{!isVirtual && <SettingsAddress {...this.props} {...settings} />}
			</div>
		);
	}
}
