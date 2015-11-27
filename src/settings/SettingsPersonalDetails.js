import React from 'react';
import ImmutableStateComponent from '../_common/ImmutableStateComponent';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends ImmutableStateComponent {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const {settings, actions} = this.props;

		return (
			<div>
				<SettingsDetails settings={settings} />
				<SettingsAddress settings={settings} actions={actions} />
			</div>
		);
	}
}
