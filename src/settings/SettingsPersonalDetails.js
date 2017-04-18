import React, { PureComponent } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends PureComponent {
    props: {
        loginid: string,
    };

    render() {
        const { loginid } = this.props;
        const isVirtual = loginid.startsWith('VRTC');

        return (
            <div className="settings-personal-page">
                <SettingsDetails {...this.props} />
                {!isVirtual && <SettingsAddress {...this.props} />}
            </div>
        );
    }
}
