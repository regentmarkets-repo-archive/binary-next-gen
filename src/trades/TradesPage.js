import React from 'react';
import { WebPage } from '../_common';
import TradesContainer from './TradesContainer';

export default props => (
	<WebPage>
		<TradesContainer tradeMode="grid" {...props} />
	</WebPage>
);
