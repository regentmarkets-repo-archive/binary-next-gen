import React from 'react';
import { DesktopPage } from '../_common';
import TradesContainer from './TradesContainer';

export default props => (
	<DesktopPage>
		<TradesContainer tradeMode="grid" {...props} />
	</DesktopPage>
);
