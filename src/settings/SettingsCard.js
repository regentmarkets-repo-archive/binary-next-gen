import React from 'react';
import { Tabs } from '../_common';
import SettingsPersonalDetails from './SettingsPersonalDetails';
import SettingsSecurity from './SettingsSecurity';
import SettingsSelfExclusion from './SettingsSelfExclusion';
import SettingsLimits from './SettingsLimits';
import { defineMessages } from 'react-intl';

export default class SettingsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {activeTab: 0};
		this.tabTitles = defineMessages({
			personal: {
				id: 'personal',
				defaultMessage: 'Personal',
			},
			security: {
				id: 'security',
				defaultMessage: 'Security',
			},
			self_ex: {
				id: 'self-exclusion',
				defaultMessage: 'Self Exclusion',
			},
			limits: {
				id: 'limits',
				defaultMessage: 'Limits',
			},
		});
	}

    static propTypes = {
		actions: React.PropTypes.object.isRequired,
        settings: React.PropTypes.object.isRequired,
		loginid: React.PropTypes.string.isRequired,
    };

	render() {
		const {loginid} = this.props;
		const isVirtual = loginid.startsWith('VRTC');
		const tabs = isVirtual ?
			[{text: this.tabTitles.personal,
				component: <SettingsPersonalDetails {...this.props}/>}] :
			[
				{text: this.tabTitles.personal, component: <SettingsPersonalDetails {...this.props}/>},
				{text: this.tabTitles.security, component: <SettingsSecurity {...this.props}/>},
				{text: this.tabTitles.self_ex, component: <SettingsSelfExclusion {...this.props}/>},
				{text: this.tabTitles.limits, component: <SettingsLimits {...this.props}/>},
			];

		return (
			<Tabs
				id="settings"
				activeIndex={this.state.activeTab}
				onChange={idx => this.setState({activeTab: idx})}
				tabs={tabs}
			/>
		);
	}
}
