import React from 'react';
import WebPage from '../containers/WebPage';
import WatchlistContainer from './WatchlistContainer';

export default (props) => (
	<WebPage>
		<WatchlistContainer {...props} />
	</WebPage>
);
