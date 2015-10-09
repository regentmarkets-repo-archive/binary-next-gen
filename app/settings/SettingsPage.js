import React from 'react';
import { DesktopPage } from '../common';
import SettingsPane from './SettingsPane';

export default (props) => (
	<DesktopPage>
		<SettingsPane {...props} />
	</DesktopPage>
);
