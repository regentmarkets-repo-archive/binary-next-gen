import React from 'react';
import WebPage from '../../containers/WebPage';
import TradeCardContainer from '../TradeCardContainer';

export default (props) => (
	<WebPage>
		<TradeCardContainer {...props} index={0} />
	</WebPage>
);
