import React, { PropTypes, PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsCashier from './SettingsCashier';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';
import SettingsChangePassword from './SettingsChangePassword';

const components = [
	SettingsPersonalDetails,
	SettingsChangePassword,
	SettingsCashier,
	SettingsSelfExclusion,
	SettingsLimits,
];

export default class SettingsCard extends PureComponent {

    static propTypes = {
        settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
		boot: PropTypes.object.isRequired,
    };

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	onTabChange = idx => this.setState({ activeTab: idx });

	render() {
		const { loginid, settings } = this.props;
		const { activeTab } = this.state;
		const isVirtual = loginid.startsWith('VRTC');
		const ActiveComponent = components[activeTab];

		return (
			<div className="settings-card">
				<TabList
					activeIndex={activeTab}
					onChange={this.onTabChange}
				>
					<Tab text="Personal" />
					<Tab text="Password" />
					{!isVirtual && <Tab text="Cashier Lock" />}
					{!isVirtual && <Tab text="Self Exclusion" />}
					{!isVirtual && <Tab text="Limits" />}
				</TabList>
				<ActiveComponent {...this.props} {...settings} />
			</div>
		);
	}
}
