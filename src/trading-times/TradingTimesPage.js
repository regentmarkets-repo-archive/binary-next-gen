import React from 'react';
import WebPage from '../containers/WebPage';
import TradingTimesContainer from './TradingTimesContainer';

export default (props) => (
	<WebPage>
		<TradingTimesContainer {...props} />
	</WebPage>
);
