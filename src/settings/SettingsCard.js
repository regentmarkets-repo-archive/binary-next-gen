import React from 'react';
import { Tabs } from '../_common';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSecurity from './SettingsSecurity';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';

export default class SettingsCard extends React.Component {

    static propTypes = {
		actions: React.PropTypes.object.isRequired,
        settings: React.PropTypes.object.isRequired,
    };

	render() {
		const {settings, actions} = this.props;

		return (
			<Tabs
				id="settings"
				activeIndex={settings.activeTab}
				onChange={idx => actions.changeSettingsActiveTab(idx)}
				tabs={[
					{text: 'Personal Details', component: <SettingsPersonalDetails settings={settings} />},
					{text: 'Security', component: <SettingsSecurity settings={settings} />},
					{text: 'Self Exclusion', component: <SettingsSelfExclusion settings={settings} />},
					{text: 'Limits', component: <SettingsLimits settings={settings} />},
				]}
			/>
		);
	}
}
