import React, { PropTypes, PureComponent } from 'react';
import SettingsChangePassword from './SettingsChangePassword';
import SettingsCashier from './SettingsCashier';

export default class SettingsSecurity extends PureComponent {

    static propTypes = {
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid } = this.props;
		const isVirtual = loginid.startsWith('VRTC');

        return (
            <div className="settings-passwords">
                <SettingsChangePassword />
                {!isVirtual && <SettingsCashier />}
            </div>
        );
    }
}
