import React from 'react';
import { DesktopPage } from '../common';
import DailyPricesCard from './DailyPricesCard';

export default (props) => (
	<DesktopPage>
		<DailyPricesCard {...props} />
	</DesktopPage>
);
