import React from 'react';
import WebPage from '../containers/WebPage';
import TradePanel from './TradePanel';

export default (props) => (
	<WebPage>
		<TradePanel compact {...props} />
	</WebPage>
);
