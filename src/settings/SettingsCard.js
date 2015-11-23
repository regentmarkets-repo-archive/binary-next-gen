import React from 'react';
import { Tabs } from '../_common';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSecurity from './SettingsSecurity';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';

export default (props) => (
	<Tabs
		id="settings"
		activeIndex={0}
		onChange={idx => props.actions.changeSettingsActiveTab(idx)}
		tabs={[
			{text: 'Personal Details', component: <SettingsPersonalDetails {...props} />},
			{text: 'Security', component: <SettingsSecurity {...props} />},
			{text: 'Self Exclusion', component: <SettingsSelfExclusion {...props} />},
			{text: 'Limits', component: <SettingsLimits {...props} />},
		]} />
);
