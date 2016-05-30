import React from 'react';
import WebPage from '../containers/WebPage';
import TickTradeContainer from './TickTradeContainer';

export default (props) => (
	<WebPage>
		<TickTradeContainer {...props} />
	</WebPage>
);
