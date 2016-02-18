import React from 'react';
import WebPage from '../containers/WebPage';
import FullTradeContainer from './FullTradeContainer';

export default (props) => (
	<WebPage>
		<FullTradeContainer {...props} />
	</WebPage>
);
