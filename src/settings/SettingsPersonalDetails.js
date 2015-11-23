import React from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends React.Component {

	static propTypes = {
		settings: React.PropTypes.object.isRequired,
	};

	render() {
		const {settings} = this.props;

		return (
			<div>
				<SettingsDetails settings={settings} />
				<SettingsAddress settings={settings} />
			</div>
		);
	}
}
