import React from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';
import LanguagePicker from '../_common/LanguagePicker';

export default class SettingsPersonalDetails extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.object.isRequired,
		loginid: React.PropTypes.string.isRequired,
	};

	render() {
		const { settings, actions, loginid } = this.props;
		const shouldHide = loginid.startsWith('VRTC');

		return (
			shouldHide ?
			<div>
				<LanguagePicker />
				<SettingsDetails settings={settings} />
			</div> :
			<div>
				<LanguagePicker />
				<SettingsDetails settings={settings} />
				<SettingsAddress settings={settings} actions={actions}/>
			</div>
		);
	}
}
