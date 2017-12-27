import React, { PureComponent } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsUserInformation from './SettingsUserInformation';

export default class SettingsPersonalDetails extends PureComponent {

	props: {
		loginid: string,
    settings: object,
    address_line_1: string,
    address_line_2: string,
    address_city: string,
    address_state: string,
    address_postcode: string,
    phone: string,
	};

	render() {
		const { loginid } = this.props;
		const isVirtual = /VR/i.test(loginid);

    return (
			<div className="settings-personal-page">
				<SettingsDetails {...this.props} />
				{!isVirtual && <SettingsUserInformation {...this.props} />}
			</div>
		);
	}
}
