import React from 'react';
import WebPage from '../containers/WebPage';
import TradesContainer from './TradesContainer';

export default props => (
	<WebPage>
		<TradesContainer tradeMode="grid" {...props} />
	</WebPage>
);
