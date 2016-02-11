import React from 'react';
import WebPage from '../containers/WebPage';
import SettingsContainer from './SettingsContainer';

export default (props) => (
	<WebPage>
		<SettingsContainer {...props} />
	</WebPage>
);
