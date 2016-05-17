import React from 'react';
import WebPage from '../containers/WebPage';
import SingleTradeContainer from './SingleTradeContainer';

export default (props) => (
	<WebPage>
		<SingleTradeContainer {...props} />
	</WebPage>
);
