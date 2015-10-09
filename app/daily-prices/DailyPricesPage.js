import React from 'react';
import { DesktopPage } from '../common';
import DailyPricesPane from './DailyPricesPane';

export default (props) => (
	<DesktopPage>
		<DailyPricesPane {...props} />
	</DesktopPage>
);
