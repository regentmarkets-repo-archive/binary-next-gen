import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import config from '../config';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';
import SettingsSecurity from './SettingsSecurity';

const components = [
  SettingsSecurity,
	SettingsPersonalDetails,
	SettingsSelfExclusion,
	SettingsLimits,
];

type Props = {
	settings: object,
	loginid: string,
};

export default class SettingsCard extends PureComponent {

	props: Props;

	constructor(props: Props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	onTabChange = idx =>
		this.setState({ activeTab: idx });

	render() {
		const { loginid, settings } = this.props;
		const { activeTab } = this.state;
		const isVirtual = loginid.startsWith('VRTC');
		const ActiveComponent = components[activeTab];
		const { version } = config;

		return (
			<div className="settings-card">
				<TabList
					activeIndex={activeTab}
					onChange={this.onTabChange}
				>
					<Tab text="Security" />
					<Tab text="Personal" />
					{!isVirtual && <Tab text="Self Exclusion" />}
					{!isVirtual && <Tab text="Limits" />}
				</TabList>
				<ActiveComponent {...this.props} {...settings} />
				<div className="version-info">Version: {version}</div>
			</div>
		);
	}
}
