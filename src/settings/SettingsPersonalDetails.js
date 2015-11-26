import React from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends React.Component {

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
