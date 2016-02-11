import React from 'react';
import WebPage from '../containers/WebPage';
import AssetIndexContainer from './AssetIndexContainer';

export default (props) => (
	<WebPage>
		<AssetIndexContainer {...props} />
	</WebPage>
);
