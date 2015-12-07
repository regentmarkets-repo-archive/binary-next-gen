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
		this.state = { activeTab: 0 };
	}

    static propTypes = {
		actions: React.PropTypes.object.isRequired,
        settings: React.PropTypes.object.isRequired,
		loginid: React.PropTypes.string.isRequired,
    };

	render() {
		const { loginid } = this.props;
		const isVirtual = loginid.startsWith('VRTC');
		const tabs = isVirtual ?
			[{ text: 'Personal', component: <SettingsPersonalDetails {...this.props}/> }] :
			[
				{ text: 'Personal', component: <SettingsPersonalDetails {...this.props}/> },
				{ text: 'Security', component: <SettingsSecurity {...this.props}/> },
				{ text: 'Self Exclusion', component: <SettingsSelfExclusion {...this.props}/> },
				{ text: 'Limits', component: <SettingsLimits {...this.props}/> },
			];

		return (
			<Tabs
				id="settings"
				activeIndex={this.state.activeTab}
				onChange={idx => this.setState({ activeTab: idx })}
				tabs={tabs}
			/>
		);
	}
}
