import React, { PropTypes, Component } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { settings, actions, loginid } = this.props;
		const isVirtual = loginid.startsWith('VRTC');

		return (
			<div>
				<SettingsDetails settings={settings} />
				{isVirtual ? null : <SettingsAddress settings={settings} actions={actions} />}
			</div>
		);
	}
}
