import React from 'react';
import WebPage from '../containers/WebPage';
import JpTradeContainer from './JpTradeContainer';

export default props => (
	<WebPage>
		<JpTradeContainer {...props} />
	</WebPage>
);
