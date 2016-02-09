import React from 'react';
import MobilePage from '../mobile/MobilePage';
import SettingsContainer from './SettingsContainer';

export default (props) => (
	<MobilePage>
		<SettingsContainer {...props} />
	</MobilePage>
);
