import React, { PureComponent } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsUserInformation from './SettingsUserInformation';

export default class SettingsPersonalDetails extends PureComponent {

	props: {
		loginid: string,
    settings: any[],
	};

	render() {
		const { loginid } = this.props;
		const isVirtual = loginid.startsWith('VRTC');

    return (
			<div className="settings-personal-page">
				<SettingsDetails {...this.props} />
				{!isVirtual && <SettingsUserInformation {...this.props} />}
			</div>
		);
	}
}
