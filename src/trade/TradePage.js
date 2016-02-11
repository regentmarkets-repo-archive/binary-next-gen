import React from 'react';
import WebPage from '../containers/WebPage';
import TradeCard from './TradeCard';

export default (props) => (
	<WebPage>
		<TradeCard {...props} />
	</WebPage>
);
