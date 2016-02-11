import React from 'react';
import WebPage from '../containers/WebPage';
import StatementContainer from './StatementContainer';

export default (props) => (
	<WebPage>
		<StatementContainer {...props} />
	</WebPage>
);
