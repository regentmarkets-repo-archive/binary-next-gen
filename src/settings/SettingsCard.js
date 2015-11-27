import React from 'react';
import { Tabs } from '../_common';
import ImmutableStateComponent from '../_common/ImmutableStateComponent';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSecurity from './SettingsSecurity';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';

export default class SettingsCard extends ImmutableStateComponent {
	constructor(props) {
		super(props);
		this.state = {activeTab: 0};
	}

    static propTypes = {
		actions: React.PropTypes.object.isRequired,
        settings: React.PropTypes.object.isRequired,
    };

	render() {
		const {settings, actions} = this.props;
		return (
			<Tabs
				id="settings"
				activeIndex={this.state.activeTab}
				onChange={idx => this.setState({activeTab: idx})}
				tabs={[
					{text: 'Personal Details', component: <SettingsPersonalDetails settings={settings} actions={actions}/>},
					{text: 'Security', component: <SettingsSecurity settings={settings} actions={actions}/>},
					{text: 'Self Exclusion', component: <SettingsSelfExclusion settings={settings} actions={actions}/>},
					{text: 'Limits', component: <SettingsLimits settings={settings} actions={actions}/>},
				]}
			/>
		);
	}
}
