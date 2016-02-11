import React from 'react';
import MobilePage from '../containers/MobilePage';
import SettingsContainer from './SettingsContainer';

export default (props) => (
	<MobilePage>
		<SettingsContainer {...props} />
	</MobilePage>
);
