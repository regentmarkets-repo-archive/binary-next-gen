import React from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.object.isRequired,
		loginid: React.PropTypes.string.isRequired,
	};

	render() {
		const {settings, actions, loginid} = this.props;
		const shouldHide = loginid.startsWith('VRTC');

		return (
			shouldHide ?
			<div>
				<SettingsDetails settings={settings} />
			</div> :
			<div>
				<SettingsDetails settings={settings} />
				<SettingsAddress settings={settings} actions={actions}/>
			</div>
		);
	}
}
