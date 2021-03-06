import React, { PureComponent } from 'react';
import SettingsChangePassword from './SettingsChangePassword';
import SettingsCashier from './SettingsCashier';

export default class SettingsSecurity extends PureComponent {

    props: {
		loginid: string,
	};

	render() {
		const { loginid } = this.props;
		const isVirtual = /VR/i.test(loginid);

        return (
            <div className="settings-passwords">
                <SettingsChangePassword />
                {!isVirtual && <SettingsCashier />}
            </div>
        );
    }
}
