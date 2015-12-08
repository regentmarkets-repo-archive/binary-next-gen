import React, { PropTypes } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';
import LanguagePicker from '../_common/LanguagePicker';

export default class SettingsPersonalDetails extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		settings: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
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
