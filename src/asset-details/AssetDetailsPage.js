import React from 'react';
import WebPage from '../containers/WebPage';
import AssetDetailsContainer from './AssetDetailsContainer';

export default (props) => (
	<WebPage>
		<AssetDetailsContainer {...props} />
	</WebPage>
);
