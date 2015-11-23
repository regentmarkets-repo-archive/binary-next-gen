import React from 'react';
import { MobilePage } from '../_common';
import SettingsContainer from './SettingsContainer';

export default (props) => (
	<MobilePage>
		<SettingsContainer {...props} />
	</MobilePage>
);
