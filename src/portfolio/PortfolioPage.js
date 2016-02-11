import React from 'react';
import WebPage from '../containers/WebPage';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<WebPage>
		<PortfolioContainer {...props} />
	</WebPage>
);
