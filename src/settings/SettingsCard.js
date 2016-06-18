import React, { PropTypes, Component } from 'react';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';
import SettingsGeneral from './SettingsGeneral';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSecurity from './SettingsSecurity';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';
import SettingsChangePassword from './SettingsChangePassword';

const components = [
	SettingsGeneral,
	SettingsPersonalDetails,
	SettingsChangePassword,
	SettingsSecurity,
	SettingsSelfExclusion,
	SettingsLimits,
];

export default class SettingsCard extends Component {

    static propTypes = {
		actions: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
		boot: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	render() {
		const { loginid } = this.props;
		const { activeTab } = this.state;
		const isVirtual = loginid.startsWith('VRTC');
		const ActiveComponent = components[activeTab];

		return (
			<div className="settings-card">
				<TabList
					activeIndex={activeTab}
					onChange={idx => this.setState({ activeTab: idx })}
				>
					<Tab text="General" />
					<Tab text="Personal" />
					<Tab text="Change Password" />
					{!isVirtual && <Tab text="Cashier Lock" />}
					{!isVirtual && <Tab text="Self Exclusion" />}
					{!isVirtual && <Tab text="Limits" />}
				</TabList>
				<ActiveComponent {...this.props} />
			</div>
		);
	}
}
