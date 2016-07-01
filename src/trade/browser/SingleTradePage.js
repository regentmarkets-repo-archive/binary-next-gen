import React from 'react';
import WebPage from '../../containers/WebPage';
import TradeCardContainer from '../TradeXCardContainer';

export default (props) => (
	<WebPage>
		<TradeCardContainer {...props} index={0} />
	</WebPage>
);
