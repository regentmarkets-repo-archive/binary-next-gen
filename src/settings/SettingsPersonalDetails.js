import React, { PropTypes, Component } from 'react';
import SettingsDetails from './SettingsDetails';
import SettingsAddress from './SettingsAddress';

export default class SettingsPersonalDetails extends Component {

	static propTypes = {
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid } = this.props;
		const isVirtual = loginid.startsWith('VRTC');

		return (
			<div>
				<SettingsDetails {...this.props} />
				{!isVirtual && <SettingsAddress {...this.props} />}
			</div>
		);
	}
}
